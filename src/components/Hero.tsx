import React, { useState } from "react";
import { HERO_IMAGE_3D } from "../data/initialData";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  onOpenTestDrive: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTestDrive,
  onOpenContact,
}) => {
  const { t } = useLanguage();
  const [activeMetric, setActiveMetric] = useState<
    "revenue" | "kpis" | "health"
  >("revenue");

  const metricDetails = {
    revenue: {
      title: t.hero.revenue,
      value: "$2,080,000",
      change: "+12.4% vs last month",
      badge: "RECORD HIGH",
    },
    kpis: {
      title: t.hero.kpis,
      value: "28.5K",
      change: "+1,420 new this week",
      badge: "HIGH ENGAGEMENT",
    },
    health: {
      title: t.hero.health,
      value: "99.98%",
      change: "Latency: 14ms (Optimal)",
      badge: "ALL SYSTEMS GO",
    },
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 right-0 -z-10 w-[500px] h-[500px] bg-[#026177]/15 dark:bg-[#026177]/25 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -left-10 -z-10 w-[400px] h-[400px] bg-[#b52703]/10 dark:bg-[#b52703]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Title */}
          <h1 className="font-geist text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#004859] dark:text-white leading-[1.1]">
            {t.hero.titleStart}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#026177] via-[#004859] to-[#b52703] dark:from-[#8ad0ea] dark:via-[#94daf3] dark:to-[#ffb4a3]">
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-lg sm:text-xl text-[#3f484c] dark:text-slate-300 leading-relaxed max-w-2xl">
            {t.hero.subtitle}
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 max-lg:justify-between">
            {/* Direct ERP Site Link */}
            <a
              href="https://erp.woubou.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-emerald-600 text-white font-mono-caps text-xs font-semibold tracking-wider uppercase hover:bg-emerald-700 transition-all space-x-2 active:scale-95 group"
            >
              <span className="material-symbols-outlined text-lg">
                open_in_new
              </span>
              <span>{t.hero.directErpBtn}</span>
            </a>

            {/* Test ERP Sandbox CTA */}
            {/* <a
              href="#erp"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[#b52703] dark:bg-[#fc5935] text-white font-mono-caps text-xs font-semibold tracking-wider uppercase hover:bg-[#fc5935] dark:hover:bg-[#ff7b5f] transition-all shadow-[0_4px_16px_rgba(181,39,3,0.35)] active:scale-95 group"
            >
              {t.hero.testErpBtn}
              <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a> */}

            {/* Contact Us */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-md border-2 border-[#026177] text-[#026177] dark:border-[#8ad0ea] dark:text-[#8ad0ea] font-mono-caps text-xs font-semibold tracking-wider uppercase hover:bg-[#026177] hover:text-white dark:hover:bg-[#8ad0ea] dark:hover:text-[#001f28] transition-all active:scale-95 cursor-pointer"
            >
              {t.hero.contactBtn}
            </button>
          </div>

          {/* Sandbox Link */}
          <div>
            <button
              onClick={onOpenTestDrive}
              className="inline-flex items-center gap-2 text-xs font-mono-caps text-[#004859] dark:text-[#8ad0ea] underline underline-offset-4 hover:text-[#b52703] dark:hover:text-[#fc5935] transition-colors py-1"
            >
              <span className="material-symbols-outlined text-base">
                terminal
              </span>
              {t.hero.sandboxDemo} &rarr;
            </button>
          </div>

          {/* Key Value Props Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#026177]/15 dark:border-white/10 text-xs font-inter text-[#3f484c] dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#026177] dark:text-[#8ad0ea] text-lg">
                check_circle
              </span>
              <span className="font-medium">{t.hero.realtimeSync}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#026177] dark:text-[#8ad0ea] text-lg">
                verified_user
              </span>
              <span className="font-medium">{t.hero.soc2Compliant}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#026177] dark:text-[#8ad0ea] text-lg">
                bolt
              </span>
              <span className="font-medium">{t.hero.deploymentTime}</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D SaaS Dashboard Preview */}
        <div className="lg:col-span-5 lg:block relative hidden">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Frame */}
            <div className="bg-[#ffffff]/80 dark:bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl transition-all duration-500 border border-[#026177]/20 dark:border-white/15 space-y-2">
              {/* Window Header */}
              <div className="flex flex-col p-2.5 gap-2.5 items-center justify-between px-3 py-2 border-b border-[#026177]/10 dark:border-white/10 bg-[#eaedff]/60 dark:bg-slate-950/80 rounded-lg">
                <div className="flex items-center gap-1.5 w-full">
                  <div className="w-3 h-3 rounded-full bg-[#ba1a1a]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffb68e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#026177]"></div>
                  <span className="font-mono-caps text-[10px] text-[#3f484c] dark:text-slate-300 ml-2 font-medium">
                    {t.hero.liveInstance}
                  </span>
                </div>
                <div className="flex items-center gap-1 w-full justify-between">
                  <button
                    onClick={() => setActiveMetric("revenue")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono-caps transition-all ${
                      activeMetric === "revenue"
                        ? "bg-[#026177] text-white font-bold"
                        : "text-[#3f484c] dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    {t.hero.revenue}
                  </button>
                  <button
                    onClick={() => setActiveMetric("kpis")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono-caps transition-all ${
                      activeMetric === "kpis"
                        ? "bg-[#026177] text-white font-bold"
                        : "text-[#3f484c] dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    {t.hero.kpis}
                  </button>
                  <button
                    onClick={() => setActiveMetric("health")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono-caps transition-all ${
                      activeMetric === "health"
                        ? "bg-[#026177] text-white font-bold"
                        : "text-[#3f484c] dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    {t.hero.health}
                  </button>
                </div>
              </div>

              {/* Artwork Container */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-white/10 group">
                <img
                  src={HERO_IMAGE_3D}
                  alt="Woubou SaaS Dashboard Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95"
                />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/20 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono-caps text-[#8ad0ea]">
                      {metricDetails[activeMetric].title}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#b52703]/90 text-[9px] font-mono-caps tracking-widest text-white">
                      {metricDetails[activeMetric].badge}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-geist text-2xl font-bold text-white">
                      {metricDetails[activeMetric].value}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">
                      {metricDetails[activeMetric].change}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Trigger Bar */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#3f484c] dark:text-slate-300 font-inter px-1">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {t.hero.syncedJustNow}
                </span>
                <button
                  onClick={onOpenTestDrive}
                  className="text-[#026177] dark:text-[#8ad0ea] hover:underline font-mono-caps text-[11px] font-semibold"
                >
                  {t.hero.exploreDashboard} &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
