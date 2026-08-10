import React, { useState } from 'react';
import { SERVICES } from '../data/initialData';
import { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onOpenContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="font-mono-caps text-xs font-semibold text-[#b52703] dark:text-[#ffb4a3] tracking-widest uppercase">
          {t.services.badge}
        </span>
        <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004859] dark:text-white">
          {t.services.title}
        </h2>
        <p className="font-inter text-base sm:text-lg text-[#3f484c] dark:text-slate-300">
          {t.services.subtitle}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => {
          const isSaas = service.category === 'saas';
          const isAutomation = service.category === 'automation';

          return (
            <div
              key={service.id}
              className="group relative bg-[#ffffff] dark:bg-slate-900/90 rounded-2xl p-8 border border-[#026177]/15 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform group-hover:scale-110 ${
                    isSaas
                      ? 'bg-[#fc5935] text-white'
                      : isAutomation
                      ? 'bg-[#004859] text-white'
                      : 'bg-[#026177] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">{service.iconName}</span>
                </div>

                {/* Category Badge */}
                <span className="font-mono-caps text-[10px] font-semibold tracking-wider text-[#6f787c] dark:text-[#8ad0ea] block mb-2">
                  {service.category.toUpperCase()} PLATFORM
                </span>

                {/* Service Title */}
                <h3 className="font-geist text-2xl font-bold text-[#131b2e] dark:text-white mb-4 group-hover:text-[#004859] dark:group-hover:text-[#8ad0ea] transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="font-inter text-sm sm:text-base text-[#3f484c] dark:text-slate-300 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Highlight Features */}
                <ul className="space-y-2 mb-8 text-xs sm:text-sm text-[#131b2e] dark:text-slate-200">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#b52703] dark:text-[#fc5935] text-base">
                        check
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Action */}
              <div className="pt-4 border-t border-[#026177]/10 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="font-mono-caps text-xs font-bold text-[#004859] dark:text-[#8ad0ea] hover:text-[#b52703] dark:hover:text-[#ffb4a3] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {t.services.viewDetails} &amp; Stack
                  <span className="material-symbols-outlined text-base">east</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenContact={onOpenContact}
      />
    </section>
  );
};
