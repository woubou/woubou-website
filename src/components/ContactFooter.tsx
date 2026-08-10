import React, { useState } from "react";
import confetti from "canvas-confetti";
import { QuoteFormData } from "../types";
import { LegalModal, LegalDocType } from "./LegalModal";
import { useLanguage } from "../context/LanguageContext";
import { Logo } from "./Logo";

export const ContactFooter: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    serviceType: "ERP Platform",
    projectBudget: "$10,000 - $25,000",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#026177] dark:bg-slate-950 text-white pt-20 pb-12 transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Banner Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#94daf3] border border-white/15">
            <span className="material-symbols-outlined text-base">forum</span>
            <span className="font-mono-caps text-xs">{t.contact.badge}</span>
          </div>

          <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t.contact.title}
          </h2>

          <p className="font-inter text-base sm:text-lg text-[#94daf3]/90 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>

          {/* Quick Contact */}
          <div className="flex items-center justify-center pt-2">
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-geist text-lg font-bold transition-all"
            >
              <span className="material-symbols-outlined text-xl text-[#94daf3]">
                phone
              </span>
              <span>+243 89 89 45 203</span>
            </a>
          </div>

          {/* Quote / Consultation Form */}
          <div className="bg-white dark:bg-slate-900 text-[#131b2e] dark:text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 text-left max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <span className="material-symbols-outlined text-3xl">
                    check
                  </span>
                </div>
                <h3 className="font-geist text-2xl font-bold text-[#004859] dark:text-white">
                  {t.contact.successTitle}
                </h3>
                <p className="font-inter text-sm text-[#3f484c] dark:text-slate-300 max-w-md mx-auto">
                  {t.contact.successDesc}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ ...formData, message: "" });
                  }}
                  className="px-6 py-2.5 rounded-md bg-[#026177] text-white font-mono-caps text-xs uppercase hover:bg-[#004859] cursor-pointer"
                >
                  {t.contact.submitAnother}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 font-inter text-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-caps text-[#3f484c] dark:text-slate-300 mb-1">
                      {t.contact.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#eaedff]/40 dark:bg-slate-800 border border-[#026177]/20 dark:border-white/15 text-[#131b2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#026177]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-caps text-[#3f484c] dark:text-slate-300 mb-1">
                      {t.contact.businessEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#eaedff]/40 dark:bg-slate-800 border border-[#026177]/20 dark:border-white/15 text-[#131b2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#026177]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-caps text-[#3f484c] dark:text-slate-300 mb-1">
                      {t.contact.companyName}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                      placeholder="Acme Global Inc"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#eaedff]/40 dark:bg-slate-800 border border-[#026177]/20 dark:border-white/15 text-[#131b2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#026177]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-caps text-[#3f484c] dark:text-slate-300 mb-1">
                      {t.contact.requestedSolution}
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          serviceType: e.target
                            .value as QuoteFormData["serviceType"],
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-[#eaedff]/40 dark:bg-slate-800 border border-[#026177]/20 dark:border-white/15 text-[#131b2e] dark:text-white focus:outline-none"
                    >
                      <option value="ERP Platform">
                        {t.contact.optionErp}
                      </option>
                      <option value="Custom Digital Solutions">
                        {t.contact.optionCustom}
                      </option>
                      <option value="Proprietary SaaS">
                        {t.contact.optionSaas}
                      </option>
                      <option value="General Inquiry">
                        {t.contact.optionGeneral}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-caps text-[#3f484c] dark:text-slate-300 mb-1">
                    {t.contact.projectScope}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us briefly about your business goals and timeline..."
                    className="w-full px-4 py-2.5 rounded-lg bg-[#eaedff]/40 dark:bg-slate-800 border border-[#026177]/20 dark:border-white/15 text-[#131b2e] dark:text-white focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#b52703] text-white font-mono-caps text-xs font-bold tracking-wider uppercase hover:bg-[#fc5935] transition-all shadow-lg active:scale-95 cursor-pointer text-center"
                >
                  {t.contact.sendRequestBtn}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation & Copyright */}
        <div className="pt-12 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo size="md" showText={true} />
            <p className="text-xs text-[#94daf3]/80">{t.contact.copyright}</p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 font-mono-caps text-xs text-[#94daf3]">
            <button
              onClick={() => setLegalDoc("privacy")}
              className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              {t.contact.privacyPolicy}
            </button>
            <button
              onClick={() => setLegalDoc("terms")}
              className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              {t.contact.termsOfService}
            </button>
            <button
              onClick={() => setLegalDoc("cookie")}
              className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              {t.contact.cookiePolicy}
            </button>
          </div>
        </div>
      </div>

      <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
    </footer>
  );
};
