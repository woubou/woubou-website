import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ERPSpotlightProps {
  onOpenERP: () => void;
}

export const ERPSpotlight: React.FC<ERPSpotlightProps> = ({ onOpenERP }) => {
  const { t } = useLanguage();

  return (
    <section id="erp" className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto py-10 md:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#004859] text-white border border-white/10 shadow-xl p-6 sm:p-9 lg:p-12">
        <div className="absolute -right-20 -top-28 w-80 h-80 rounded-full bg-[#8ad0ea]/15 blur-3xl" />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono-caps text-[10px] sm:text-xs text-[#94daf3] tracking-widest">{t.erp.availableNow}</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-300 text-[10px] font-mono-caps border border-emerald-300/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {t.erp.online}
              </span>
            </div>
            <h2 className="font-geist text-3xl sm:text-4xl font-bold">{t.erp.teaserTitle}</h2>
            <p className="font-inter text-base sm:text-lg text-[#d5f3ff] leading-relaxed max-w-3xl">{t.erp.teaserDescription}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#d5f3ff]">
              {[t.erp.tabFinancials, t.erp.tabInventory, t.erp.tabCrm, t.erp.tabWorkflow].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#ffb4a3] text-base">check_circle</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <button
              onClick={onOpenERP}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#004859] font-mono-caps text-xs font-bold tracking-wider uppercase hover:bg-[#d5f3ff] transition-all active:scale-95 cursor-pointer"
            >
              {t.erp.discoverBtn}
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
