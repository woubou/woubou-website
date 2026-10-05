import React, { useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Logo } from './Logo';
import { apiErrorMessage, readApiResponse } from '../utils/api';

type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  companyName: string;
  phone: string;
  serviceType: string;
  message: string;
  status: ContactStatus;
  mailStatus: 'sent' | 'failed' | 'not_configured' | 'pending';
  mailError?: string;
  mailId?: string;
  mailLastAttemptAt?: string;
  createdAt: string;
}

interface ReportsData {
  mailConfig: {
    configured: boolean;
    recipient: string;
    from: string;
  };
  summary: {
    views30d: number;
    visitors30d: number;
    contacts30d: number;
    newContacts: number;
  };
  dailyTraffic: Array<{ date: string; views: number; visitors: number }>;
  sources: Array<{ source: string; views: number }>;
  contacts: ContactRecord[];
}

const statusLabels: Record<ContactStatus, string> = {
  new: 'Nouveau',
  read: 'Lu',
  replied: 'Répondu',
  archived: 'Archivé'
};

export const AdminReportsPage: React.FC = () => {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('woubou_admin_key') || '');
  const [reports, setReports] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryingContactId, setRetryingContactId] = useState('');
  const [contactFilter, setContactFilter] = useState<'all' | ContactStatus>('all');

  const loadReports = async (key = adminKey) => {
    if (!key) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/reports', {
        headers: { Authorization: `Bearer ${key}` }
      });
      const payload = await readApiResponse<ReportsData & { error?: string }>(response);
      if (!response.ok || !payload) {
        throw new Error(apiErrorMessage(response, payload, 'Impossible de charger les rapports.'));
      }
      sessionStorage.setItem('woubou_admin_key', key);
      setReports(payload);
    } catch (requestError) {
      setReports(null);
      setError(requestError instanceof Error ? requestError.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) loadReports(adminKey);
    // Run only once when the admin page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredContacts = useMemo(() => {
    if (!reports) return [];
    return contactFilter === 'all'
      ? reports.contacts
      : reports.contacts.filter((contact) => contact.status === contactFilter);
  }, [reports, contactFilter]);

  const updateStatus = async (contactId: string, status: ContactStatus) => {
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${adminKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      const payload = await readApiResponse<{ error?: string }>(response);
      if (!response.ok) throw new Error(apiErrorMessage(response, payload, 'Mise à jour impossible.'));
      setReports((current) => current ? {
        ...current,
        summary: {
          ...current.summary,
          newContacts: current.contacts.filter((contact) => (contact.id === contactId ? status : contact.status) === 'new').length
        },
        contacts: current.contacts.map((contact) => contact.id === contactId ? { ...contact, status } : contact)
      } : current);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Mise à jour impossible.');
    }
  };

  const retryEmail = async (contactId: string) => {
    setRetryingContactId(contactId);
    setError('');
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}/retry-email`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminKey}` }
      });
      const payload = await readApiResponse<{ contact?: ContactRecord; error?: string }>(response);
      if (!response.ok || !payload?.contact) {
        throw new Error(apiErrorMessage(response, payload, 'La notification n’a pas pu être relancée.'));
      }
      setReports((current) => current ? {
        ...current,
        contacts: current.contacts.map((contact) => contact.id === contactId ? payload.contact! : contact)
      } : current);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'La notification n’a pas pu être relancée.');
    } finally {
      setRetryingContactId('');
    }
  };

  if (!reports) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-5">
        <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-7 sm:p-9 space-y-7">
          <Logo size="lg" />
          <div>
            <span className="font-mono-caps text-[10px] text-[#8ad0ea]">ESPACE PRIVÉ</span>
            <h1 className="font-geist text-3xl font-bold mt-2">Rapports Woubou</h1>
            <p className="text-sm text-slate-400 mt-2">Saisissez votre clé administrateur pour consulter le trafic et les demandes de contact.</p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              loadReports();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-mono-caps text-[10px] text-slate-400 mb-2">Clé administrateur</label>
              <input
                type="password"
                value={adminKey}
                onChange={(event) => setAdminKey(event.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#8ad0ea]"
              />
            </div>
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <button
              type="submit"
              disabled={loading || !adminKey}
              className="w-full py-3 rounded-xl bg-[#026177] hover:bg-[#08758c] disabled:opacity-50 font-mono-caps text-xs font-bold transition-colors"
            >
              {loading ? 'Chargement…' : 'Accéder aux rapports'}
            </button>
          </form>
          <a href="/" className="block text-center text-xs text-[#8ad0ea] hover:underline">← Retour au site</a>
        </div>
      </main>
    );
  }

  const cards = [
    { label: 'Vues — 30 jours', value: reports.summary.views30d, icon: 'visibility' },
    { label: 'Visiteurs — 30 jours', value: reports.summary.visitors30d, icon: 'group' },
    { label: 'Contacts — 30 jours', value: reports.summary.contacts30d, icon: 'mail' },
    { label: 'À traiter', value: reports.summary.newContacts, icon: 'notification_important' }
  ];

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#131b2e]">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#026177]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <button onClick={() => loadReports()} className="p-2.5 rounded-lg border border-[#026177]/15 hover:bg-[#026177]/5" aria-label="Actualiser">
              <span className="material-symbols-outlined">refresh</span>
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('woubou_admin_key');
                setAdminKey('');
                setReports(null);
              }}
              className="px-4 py-2.5 rounded-lg bg-[#004859] text-white font-mono-caps text-[10px]"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div>
          <span className="font-mono-caps text-[10px] text-[#b52703]">PILOTAGE DU SITE</span>
          <h1 className="font-geist text-3xl sm:text-4xl font-bold text-[#004859] mt-2">Trafic et demandes de contact</h1>
          <p className="text-slate-600 mt-2">Vue consolidée des 30 derniers jours.</p>
        </div>

        {error && <div className="p-4 rounded-xl bg-rose-50 text-rose-800 border border-rose-200">{error}</div>}

        <section className={`rounded-2xl border p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${reports.mailConfig.configured ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5">{reports.mailConfig.configured ? 'mark_email_read' : 'warning'}</span>
            <div>
              <h2 className="font-geist font-bold">Notifications e-mail {reports.mailConfig.configured ? 'configurées' : 'non configurées'}</h2>
              <p className="text-sm mt-1 opacity-80">
                {reports.mailConfig.configured
                  ? `Les nouvelles demandes sont envoyées à ${reports.mailConfig.recipient}.`
                  : 'Ajoutez BLOONIO_MAIL_API_KEY, CONTACT_NOTIFICATION_EMAIL et CONTACT_FROM_EMAIL dans le fichier .env, puis redémarrez le serveur.'}
              </p>
            </div>
          </div>
          {reports.mailConfig.from && <span className="font-mono-caps text-[9px] opacity-70">Depuis : {reports.mailConfig.from}</span>}
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-[#026177]/10 shadow-sm p-5 flex items-center justify-between">
              <div>
                <p className="font-mono-caps text-[9px] text-slate-500">{card.label}</p>
                <p className="font-geist text-3xl font-bold text-[#004859] mt-2">{card.value.toLocaleString()}</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-[#026177] bg-[#026177]/10 p-3 rounded-xl">{card.icon}</span>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-2xl border border-[#026177]/10 shadow-sm p-5 sm:p-6">
            <h2 className="font-geist text-xl font-bold text-[#004859]">Évolution du trafic</h2>
            <p className="text-sm text-slate-500 mt-1">Vues et visiteurs uniques par jour</p>
            <div className="h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reports.dailyTraffic}>
                  <defs>
                    <linearGradient id="adminViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#026177" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#026177" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} fontSize={11} />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" name="Vues" stroke="#026177" fill="url(#adminViews)" strokeWidth={2} />
                  <Area type="monotone" dataKey="visitors" name="Visiteurs" stroke="#b52703" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#026177]/10 shadow-sm p-5 sm:p-6">
            <h2 className="font-geist text-xl font-bold text-[#004859]">Sources du trafic</h2>
            <div className="mt-6 space-y-4">
              {reports.sources.length === 0 && <p className="text-sm text-slate-500">Aucune donnée pour le moment.</p>}
              {reports.sources.map((source) => {
                const percentage = reports.summary.views30d ? Math.round((source.views / reports.summary.views30d) * 100) : 0;
                return (
                  <div key={source.source}>
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="truncate">{source.source}</span>
                      <span className="font-semibold">{source.views} · {percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-[#026177] rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#026177]/10 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#026177]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-geist text-xl font-bold text-[#004859]">Demandes de contact</h2>
              <p className="text-sm text-slate-500 mt-1">Adresses, messages et état de traitement.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'new', 'read', 'replied', 'archived'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setContactFilter(status)}
                  className={`px-3 py-2 rounded-lg font-mono-caps text-[9px] ${contactFilter === status ? 'bg-[#004859] text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {status === 'all' ? 'Tous' : statusLabels[status]}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-mono-caps text-[9px]">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Entreprise / service</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Notification</th>
                  <th className="px-5 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className={contact.status === 'new' ? 'bg-[#026177]/[0.025]' : ''}>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-500">{new Date(contact.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold">{contact.name}</p>
                      <a href={`mailto:${contact.email}`} className="text-[#026177] hover:underline">{contact.email}</a>
                      {contact.phone && <p className="text-xs text-slate-500 mt-1">{contact.phone}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium">{contact.companyName || '—'}</p>
                      <p className="text-xs text-slate-500 mt-1">{contact.serviceType}</p>
                    </td>
                    <td className="px-5 py-4 max-w-xs"><p className="line-clamp-3 text-slate-600">{contact.message || '—'}</p></td>
                    <td className="px-5 py-4 max-w-sm">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono-caps ${contact.mailStatus === 'sent' ? 'bg-emerald-100 text-emerald-800' : contact.mailStatus === 'failed' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                        {contact.mailStatus === 'sent' ? 'Envoyée' : contact.mailStatus === 'failed' ? 'Échec' : 'À configurer'}
                      </span>
                      {contact.mailError && (
                        <p className="mt-2 text-xs text-rose-700 leading-relaxed break-words" title={contact.mailError}>
                          {contact.mailError}
                        </p>
                      )}
                      {contact.mailStatus !== 'sent' && (
                        <button
                          onClick={() => retryEmail(contact.id)}
                          disabled={retryingContactId === contact.id}
                          className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono-caps font-bold text-[#026177] hover:underline disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-sm">refresh</span>
                          {retryingContactId === contact.id ? 'Nouvel essai…' : 'Réessayer'}
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={contact.status}
                        onChange={(event) => updateStatus(contact.id, event.target.value as ContactStatus)}
                        className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                      >
                        {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
                {filteredContacts.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">Aucune demande dans cette catégorie.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};
