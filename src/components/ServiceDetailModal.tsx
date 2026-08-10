import React from 'react';
import { ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenContact
}) => {
  const { t } = useLanguage();
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#ffffff] dark:bg-[#0f172a] text-[#131b2e] dark:text-white rounded-2xl shadow-2xl border border-[#026177]/20 dark:border-white/15 overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#026177]/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#026177] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl">{service.iconName}</span>
            </div>
            <div>
              <span className="font-mono-caps text-xs text-[#b52703] dark:text-[#ffb4a3]">
                {service.category.toUpperCase()} SOLUTION
              </span>
              <h3 className="font-geist text-2xl font-bold text-[#004859] dark:text-white">
                {service.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#3f484c] dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Description */}
        <p className="font-inter text-base text-[#3f484c] dark:text-slate-300 leading-relaxed">
          {service.fullDesc}
        </p>

        {/* Key Features */}
        <div className="space-y-3">
          <h4 className="font-geist text-sm font-semibold text-[#004859] dark:text-white uppercase tracking-wider">
            {t.services.keyFeatures}
          </h4>
          <ul className="grid grid-cols-1 gap-2 text-sm text-[#131b2e] dark:text-slate-200">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2.5 bg-[#eaedff]/60 dark:bg-white/5 p-2.5 rounded-lg border border-[#026177]/10 dark:border-white/5">
                <span className="material-symbols-outlined text-[#b52703] dark:text-[#fc5935] text-lg">
                  check_circle
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Badges */}
        <div className="space-y-2">
          <h4 className="font-geist text-xs font-semibold text-[#004859] dark:text-[#8ad0ea] uppercase tracking-wider">
            {t.services.techStack}
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-[#026177]/10 dark:bg-white/10 text-[#026177] dark:text-[#8ad0ea] font-mono-caps text-xs font-medium border border-[#026177]/20 dark:border-white/15"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#026177]/10 dark:border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-md border border-[#6f787c]/30 text-[#3f484c] dark:text-slate-300 font-mono-caps text-xs tracking-wider hover:bg-black/5 dark:hover:bg-white/5"
          >
            {t.services.close}
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="px-6 py-2.5 rounded-md bg-[#b52703] text-white font-mono-caps text-xs tracking-wider uppercase hover:bg-[#fc5935] shadow-md transition-all"
          >
            {t.services.requestQuote}
          </button>
        </div>
      </div>
    </div>
  );
};
