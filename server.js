import "dotenv/config";
import express from "express";
import { timingSafeEqual, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(rootDir, "data");
const trafficFile = path.join(dataDir, "traffic.json");
const contactsFile = path.join(dataDir, "contacts.json");
const port = Number(process.env.PORT || 3001);

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));

const contactAttempts = new Map();

async function ensureStorage() {
  await mkdir(dataDir, { recursive: true });
  for (const file of [trafficFile, contactsFile]) {
    try {
      await readFile(file, "utf8");
    } catch {
      await writeFile(file, "[]", "utf8");
    }
  }
}

async function readCollection(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return [];
  }
}

async function writeCollection(file, value) {
  const tempFile = `${file}.tmp`;
  await writeFile(tempFile, JSON.stringify(value, null, 2), "utf8");
  await rename(tempFile, file);
}

function safeText(value, maxLength = 500) {
  return String(value ?? "")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return safeText(value, 4000)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function errorDetails(error) {
  return (
    safeText(
      [error?.message, error?.cause?.message, error?.cause?.code]
        .filter(Boolean)
        .filter((value, index, values) => values.indexOf(value) === index)
        .join(" — "),
      500,
    ) || "Erreur inconnue lors de l’envoi."
  );
}

function adminAuthorized(req) {
  const configuredKey = process.env.ADMIN_DASHBOARD_KEY || "";
  const suppliedKey =
    req.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    req.get("x-admin-key") ||
    "";
  if (!configuredKey || !suppliedKey) return false;
  const expected = Buffer.from(configuredKey);
  const supplied = Buffer.from(suppliedKey);
  return (
    expected.length === supplied.length && timingSafeEqual(expected, supplied)
  );
}

function requireAdmin(req, res, next) {
  if (!process.env.ADMIN_DASHBOARD_KEY) {
    return res.status(503).json({ error: "Administration non configurée." });
  }
  if (!adminAuthorized(req))
    return res.status(401).json({ error: "Accès refusé." });
  next();
}

async function sendContactNotification(contact) {
  const apiKey = process.env.BLOONIO_MAIL_API_KEY;
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !from) {
    const missing = [
      !apiKey && "BLOONIO_MAIL_API_KEY",
      !recipient && "CONTACT_NOTIFICATION_EMAIL",
      !from && "CONTACT_FROM_EMAIL",
    ].filter(Boolean);
    return {
      status: "not_configured",
      error: `Configuration manquante : ${missing.join(", ")}`,
    };
  }

  const baseUrl =
    process.env.BLOONIO_MAIL_BASE_URL || "https://mail-relay-api.bloonio.com";
  const response = await fetch(new URL("/api/v1/relay/emails", baseUrl), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `woubou-contact-${contact.id}`,
    },
    body: JSON.stringify({
      from,
      from_name: process.env.CONTACT_FROM_NAME || "Woubou Site",
      to: [recipient],
      reply_to: contact.email,
      subject: `Nouvelle demande Woubou — ${contact.name}`,
      html: `
        <h2>Nouvelle demande depuis woubou.com</h2>
        <p><strong>Nom :</strong> ${escapeHtml(contact.name)}</p>
        <p><strong>E-mail :</strong> ${escapeHtml(contact.email)}</p>
        <p><strong>Entreprise :</strong> ${escapeHtml(contact.companyName || "Non renseignée")}</p>
        <p><strong>Service :</strong> ${escapeHtml(contact.serviceType)}</p>
        <p><strong>Message :</strong><br>${escapeHtml(contact.message || "Aucun message").replaceAll("\n", "<br>")}</p>
      `,
    }),
  });

  const responseBody = await response.text();
  let payload = {};
  if (responseBody) {
    try {
      payload = JSON.parse(responseBody);
    } catch {
      if (response.ok) throw new Error("Réponse Bloonio invalide.");
    }
  }
  if (!response.ok) {
    const detail = payload.detail || payload.message || payload.error;
    const message =
      typeof detail === "string" ? detail : `Erreur Bloonio ${response.status}`;
    throw new Error(message);
  }
  return { status: "sent", id: payload.id };
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    mailConfigured: Boolean(
      process.env.BLOONIO_MAIL_API_KEY &&
      process.env.CONTACT_NOTIFICATION_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
    ),
  });
});

app.post("/api/traffic", async (req, res) => {
  const sessionId = safeText(req.body.sessionId, 100);
  const page = safeText(req.body.page || "/", 200);
  if (!sessionId) return res.status(400).json({ error: "Session manquante." });

  const events = await readCollection(trafficFile);
  const now = Date.now();
  const duplicate = events.some(
    (event) =>
      event.sessionId === sessionId &&
      event.page === page &&
      now - new Date(event.createdAt).getTime() < 30 * 60 * 1000,
  );
  if (!duplicate) {
    events.push({
      id: randomUUID(),
      sessionId,
      page,
      referrer: safeText(req.body.referrer || "Direct", 300),
      language: safeText(req.body.language, 20),
      createdAt: new Date(now).toISOString(),
    });
    await writeCollection(trafficFile, events.slice(-20000));
  }
  res.status(202).json({ tracked: !duplicate });
});

app.post("/api/contacts", async (req, res) => {
  const ipKey = req.ip || "unknown";
  const recentAttempts = (contactAttempts.get(ipKey) || []).filter(
    (time) => Date.now() - time < 60 * 60 * 1000,
  );
  if (recentAttempts.length >= 5)
    return res
      .status(429)
      .json({ error: "Trop de demandes. Réessayez plus tard." });
  contactAttempts.set(ipKey, [...recentAttempts, Date.now()]);

  if (safeText(req.body.website, 200))
    return res.status(202).json({ success: true });

  const contact = {
    id: randomUUID(),
    name: safeText(req.body.name, 120),
    email: safeText(req.body.email, 180).toLowerCase(),
    companyName: safeText(req.body.companyName, 180),
    phone: safeText(req.body.phone, 50),
    serviceType: safeText(req.body.serviceType, 120),
    message: safeText(req.body.message, 3000),
    status: "new",
    mailStatus: "pending",
    createdAt: new Date().toISOString(),
  };

  if (!contact.name || !isEmail(contact.email)) {
    return res
      .status(400)
      .json({ error: "Nom et adresse e-mail valides requis." });
  }

  const contacts = await readCollection(contactsFile);
  contacts.unshift(contact);
  await writeCollection(contactsFile, contacts.slice(0, 5000));

  try {
    const mail = await sendContactNotification(contact);
    contact.mailStatus = mail.status;
    contact.mailId = mail.id;
    contact.mailError = mail.error;
  } catch (error) {
    contact.mailStatus = "failed";
    contact.mailError = errorDetails(error);
  }
  await writeCollection(contactsFile, contacts);

  if (contact.mailStatus !== "sent") {
    const statusCode = contact.mailStatus === "not_configured" ? 503 : 502;
    return res.status(statusCode).json({
      success: false,
      id: contact.id,
      notification: contact.mailStatus,
      error:
        "Votre demande a bien été enregistrée, mais la notification e-mail a échoué. Ne renvoyez pas le formulaire ; contactez-nous directement si nécessaire.",
    });
  }

  res
    .status(201)
    .json({ success: true, id: contact.id, notification: contact.mailStatus });
});

app.get("/api/admin/reports", requireAdmin, async (_req, res) => {
  const [events, contacts] = await Promise.all([
    readCollection(trafficFile),
    readCollection(contactsFile),
  ]);
  const since = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentEvents = events.filter(
    (event) => new Date(event.createdAt).getTime() >= since,
  );
  const uniqueVisitors = new Set(recentEvents.map((event) => event.sessionId))
    .size;
  const dailyMap = new Map();

  for (let offset = 29; offset >= 0; offset -= 1) {
    const date = new Date(Date.now() - offset * 86400000)
      .toISOString()
      .slice(0, 10);
    dailyMap.set(date, { date, views: 0, visitors: new Set() });
  }
  for (const event of recentEvents) {
    const day = dailyMap.get(event.createdAt.slice(0, 10));
    if (day) {
      day.views += 1;
      day.visitors.add(event.sessionId);
    }
  }

  const sourceCounts = recentEvents.reduce((acc, event) => {
    let source = "Direct";
    try {
      source =
        event.referrer === "Direct"
          ? "Direct"
          : new URL(event.referrer).hostname;
    } catch {
      source = event.referrer || "Direct";
    }
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  res.json({
    mailConfig: {
      configured: Boolean(
        process.env.BLOONIO_MAIL_API_KEY &&
        process.env.CONTACT_NOTIFICATION_EMAIL &&
        process.env.CONTACT_FROM_EMAIL,
      ),
      recipient: process.env.CONTACT_NOTIFICATION_EMAIL || "",
      from: process.env.CONTACT_FROM_NAME
        ? `${process.env.CONTACT_FROM_NAME} <${process.env.CONTACT_FROM_EMAIL || ""}>`
        : process.env.CONTACT_FROM_EMAIL || "",
    },
    summary: {
      views30d: recentEvents.length,
      visitors30d: uniqueVisitors,
      contacts30d: contacts.filter(
        (contact) => new Date(contact.createdAt).getTime() >= since,
      ).length,
      newContacts: contacts.filter((contact) => contact.status === "new")
        .length,
    },
    dailyTraffic: [...dailyMap.values()].map((day) => ({
      date: day.date,
      views: day.views,
      visitors: day.visitors.size,
    })),
    sources: Object.entries(sourceCounts)
      .map(([source, views]) => ({ source, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8),
    contacts,
  });
});

app.patch("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
  const allowedStatuses = new Set(["new", "read", "replied", "archived"]);
  const status = safeText(req.body.status, 20);
  if (!allowedStatuses.has(status))
    return res.status(400).json({ error: "Statut invalide." });
  const contacts = await readCollection(contactsFile);
  const contact = contacts.find((item) => item.id === req.params.id);
  if (!contact) return res.status(404).json({ error: "Contact introuvable." });
  contact.status = status;
  contact.updatedAt = new Date().toISOString();
  await writeCollection(contactsFile, contacts);
  res.json({ success: true, contact });
});

app.post(
  "/api/admin/contacts/:id/retry-email",
  requireAdmin,
  async (req, res) => {
    const contacts = await readCollection(contactsFile);
    const contact = contacts.find((item) => item.id === req.params.id);
    if (!contact)
      return res.status(404).json({ error: "Contact introuvable." });

    try {
      const mail = await sendContactNotification(contact);
      contact.mailStatus = mail.status;
      contact.mailId = mail.id;
      contact.mailError = mail.error;
    } catch (error) {
      contact.mailStatus = "failed";
      contact.mailError = errorDetails(error);
    }
    contact.mailLastAttemptAt = new Date().toISOString();
    await writeCollection(contactsFile, contacts);
    res.json({ success: contact.mailStatus === "sent", contact });
  },
);

const distDir = path.join(rootDir, "dist");
app.use(express.static(distDir));
app.get("*", (_req, res) => res.sendFile(path.join(distDir, "index.html")));

await ensureStorage();
app.listen(port, () => {
  console.log(`Woubou server running on http://localhost:${port}`);
});
