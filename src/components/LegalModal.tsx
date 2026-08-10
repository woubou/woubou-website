import React from 'react';

export type LegalDocType = 'privacy' | 'terms' | 'cookie' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  if (!docType) return null;

  const docTitles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookie: 'Cookie Policy'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#faf8ff] dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-[#026177]/20 dark:border-white/15 overflow-hidden p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#026177]/10 dark:border-white/10 pb-4">
          <h3 className="font-geist text-2xl font-bold text-[#004859] dark:text-white">
            {docTitles[docType]}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#3f484c] dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="font-inter text-sm text-[#3f484c] dark:text-slate-300 space-y-4 leading-relaxed">
          {docType === 'privacy' && (
            <>
              <p>
                <strong>Effective Date: August 7, 2026</strong>
              </p>
              <p>
                Woubou Digital Agency ("Woubou", "we", "us") respects your data privacy. This Privacy Policy describes how we collect, process, and safeguard personal and operational business data across our SaaS platforms and custom web implementations.
              </p>
              <h4 className="font-semibold text-[#004859] dark:text-white pt-2">1. Information We Collect</h4>
              <p>
                We collect business contact information (name, email address, phone number, company name) provided voluntarily through our consultation forms, as well as operational telemetry generated during active ERP SaaS subscriptions.
              </p>
              <h4 className="font-semibold text-[#004859] dark:text-white pt-2">2. Data Security & Encryption</h4>
              <p>
                All data transmitted to or from Woubou infrastructure is encrypted in transit using TLS 1.3 and encrypted at rest using AES-256. Enterprise subscriptions feature dedicated tenant isolation.
              </p>
            </>
          )}

          {docType === 'terms' && (
            <>
              <p>
                <strong>Last Updated: August 2026</strong>
              </p>
              <p>
                By accessing Woubou Digital Agency websites or utilizing our proprietary ERP software, you agree to be bound by these Terms of Service.
              </p>
              <h4 className="font-semibold text-[#004859] dark:text-white pt-2">1. SaaS License & Usage</h4>
              <p>
                Woubou grants your business a non-exclusive, non-transferable subscription license to access and operate our ERP platform modules in accordance with your chosen enterprise tier.
              </p>
              <h4 className="font-semibold text-[#004859] dark:text-white pt-2">2. Uptime & SLA Guarantee</h4>
              <p>
                We guarantee a 99.9% service level uptime for all production cloud instances, supported by 24/7 technical monitoring.
              </p>
            </>
          )}

          {docType === 'cookie' && (
            <>
              <p>
                Woubou uses essential first-party cookies to preserve active session authentication states, store light/dark theme preferences, and maintain workspace security. We do not sell user data to third-party ad networks.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-[#026177]/10 dark:border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-[#026177] text-white font-mono-caps text-xs tracking-wider"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
