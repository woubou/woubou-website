import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { t } = useLanguage();

  const expertise = [
    { icon: 'code', label: t.services.filterCustom },
    { icon: 'dashboard', label: t.services.filterSaas },
    { icon: 'automation', label: t.services.filterAutomation }
  ];

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto overflow-hidden">
      <div className="absolute top-10 right-0 -z-10 w-[500px] h-[500px] bg-[#026177]/15 dark:bg-[#026177]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-10 -z-10 w-[400px] h-[400px] bg-[#b52703]/10 dark:bg-[#b52703]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-7 space-y-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#026177]/10 dark:bg-[#8ad0ea]/10 text-[#004859] dark:text-[#8ad0ea] border border-[#026177]/15 dark:border-[#8ad0ea]/20 font-mono-caps text-[10px] sm:text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#b52703] dark:bg-[#fc5935]" />
            {t.hero.badge}
          </span>

          <h1 className="font-geist text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#004859] dark:text-white leading-[1.08]">
            {t.hero.titleStart}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#026177] via-[#004859] to-[#b52703] dark:from-[#8ad0ea] dark:via-[#94daf3] dark:to-[#ffb4a3]">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p className="font-inter text-lg sm:text-xl text-[#3f484c] dark:text-slate-300 leading-relaxed max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[#004859] text-white font-mono-caps text-xs font-semibold tracking-wider uppercase hover:bg-[#026177] transition-all shadow-[0_4px_16px_rgba(0,72,89,0.25)] active:scale-95 group"
            >
              {t.hero.servicesBtn}
              <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-md border-2 border-[#026177] text-[#026177] dark:border-[#8ad0ea] dark:text-[#8ad0ea] font-mono-caps text-xs font-semibold tracking-wider uppercase hover:bg-[#026177] hover:text-white dark:hover:bg-[#8ad0ea] dark:hover:text-[#001f28] transition-all active:scale-95 cursor-pointer"
            >
              {t.hero.contactBtn}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#026177]/15 dark:border-white/10">
            {[t.hero.customApproach, t.hero.humanSupport, t.hero.scalableTech].map((value, index) => (
              <div key={value} className="flex items-center gap-2 text-xs font-inter text-[#3f484c] dark:text-slate-300">
                <span className="material-symbols-outlined text-[#026177] dark:text-[#8ad0ea] text-lg">
                  {['tune', 'handshake', 'trending_up'][index]}
                </span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative max-w-lg mx-auto lg:max-w-none p-5 sm:p-7 rounded-[2rem] bg-[#004859] text-white shadow-2xl overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#8ad0ea]/15 blur-2xl" />
            <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-[#fc5935]/15 blur-2xl" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono-caps text-[10px] text-[#94daf3]">{t.hero.expertiseLabel}</span>
                <span className="material-symbols-outlined text-[#ffb4a3]">hub</span>
              </div>
              <div className="space-y-3">
                {expertise.map((item, index) => (
                  <div key={item.label} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${index === 1 ? 'bg-[#fc5935]' : 'bg-white/10'}`}>
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <span className="block font-mono-caps text-[9px] text-[#94daf3]">0{index + 1}</span>
                      <span className="font-geist font-semibold text-base sm:text-lg">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-inter text-sm text-[#d5f3ff] leading-relaxed">{t.hero.expertiseCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
