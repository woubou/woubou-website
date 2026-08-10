import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ROICalculatorProps {
  onOpenContact: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenContact }) => {
  const { t } = useLanguage();
  const [employees, setEmployees] = useState<number>(25);
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [adminHours, setAdminHours] = useState<number>(8);
  const [softwareSpend, setSoftwareSpend] = useState<number>(2500);

  // Math Calculations
  const weeklyHoursSavedPerEmployee = adminHours * 0.65;
  const totalWeeklyHoursSaved = weeklyHoursSavedPerEmployee * employees;
  const totalMonthlyHoursSaved = Math.round(totalWeeklyHoursSaved * 4.2);
  const annualLaborSavings = Math.round(totalWeeklyHoursSaved * 52 * hourlyRate);

  const annualSoftwareSavings = Math.round(softwareSpend * 12 * 0.35);
  const totalAnnualSavings = annualLaborSavings + annualSoftwareSavings;

  const estimatedWoubouCost = Math.max(6000, Math.round(employees * 350));
  const roiMultiplier = (totalAnnualSavings / estimatedWoubouCost).toFixed(1);

  return (
    <section id="calculator" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
      <div className="bg-[#ffffff] dark:bg-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#026177]/20 dark:border-white/10 shadow-xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="font-mono-caps text-xs font-semibold text-[#b52703] dark:text-[#ffb4a3] tracking-widest uppercase">
            {t.calculator.badge}
          </span>
          <h2 className="font-geist text-3xl sm:text-4xl font-bold text-[#004859] dark:text-white">
            {t.calculator.title}
          </h2>
          <p className="font-inter text-base text-[#3f484c] dark:text-slate-300">
            {t.calculator.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls / Inputs */}
          <div className="lg:col-span-7 space-y-6 bg-[#eaedff]/40 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-[#026177]/15 dark:border-white/10 shadow-sm">
            
            {/* Input 1: Employees */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-inter">
                <label className="font-semibold text-[#131b2e] dark:text-white">
                  {t.calculator.employeesLabel}:
                </label>
                <span className="font-mono-caps font-bold text-[#026177] dark:text-[#8ad0ea]">
                  {employees}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value))}
                className="w-full accent-[#026177] cursor-pointer"
              />
            </div>

            {/* Input 2: Hourly Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-inter">
                <label className="font-semibold text-[#131b2e] dark:text-white">
                  {t.calculator.hourlyRateLabel}:
                </label>
                <span className="font-mono-caps font-bold text-[#026177] dark:text-[#8ad0ea]">
                  ${hourlyRate} / hr
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full accent-[#026177] cursor-pointer"
              />
            </div>

            {/* Input 3: Weekly Admin Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-inter">
                <label className="font-semibold text-[#131b2e] dark:text-white">
                  {t.calculator.adminHoursLabel}:
                </label>
                <span className="font-mono-caps font-bold text-[#b52703] dark:text-[#ffb4a3]">
                  {adminHours} hrs / week
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={adminHours}
                onChange={(e) => setAdminHours(parseInt(e.target.value))}
                className="w-full accent-[#b52703] cursor-pointer"
              />
            </div>

            {/* Input 4: Software Stack Spend */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-inter">
                <label className="font-semibold text-[#131b2e] dark:text-white">
                  {t.calculator.traditionalCost}:
                </label>
                <span className="font-mono-caps font-bold text-[#026177] dark:text-[#8ad0ea]">
                  ${softwareSpend.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="250"
                value={softwareSpend}
                onChange={(e) => setSoftwareSpend(parseInt(e.target.value))}
                className="w-full accent-[#026177] cursor-pointer"
              />
            </div>

          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#004859] to-[#026177] text-white p-8 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

            <span className="font-mono-caps text-xs text-[#94daf3] tracking-widest block uppercase">
              {t.calculator.woubouSavings}
            </span>

            {/* Big Savings Number */}
            <div className="space-y-1">
              <div className="text-xs text-[#94daf3]">{t.calculator.netSavings}</div>
              <div className="font-geist text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                ${totalAnnualSavings.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-300 font-medium">
                {t.calculator.roiPayback}: <span className="font-bold">{roiMultiplier}x ROI</span>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
              <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <span className="text-[11px] font-mono-caps text-[#94daf3] block">{t.calculator.hoursSavedMonth}</span>
                <span className="font-geist text-xl font-bold">{totalMonthlyHoursSaved.toLocaleString()} hrs</span>
              </div>
              <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <span className="text-[11px] font-mono-caps text-[#94daf3] block">Software Savings</span>
                <span className="font-geist text-xl font-bold">${annualSoftwareSavings.toLocaleString()} / yr</span>
              </div>
            </div>

            <button
              onClick={onOpenContact}
              className="w-full py-3.5 rounded-md bg-[#b52703] text-white font-mono-caps text-xs font-semibold tracking-wider uppercase hover:bg-[#fc5935] transition-all shadow-lg active:scale-95 cursor-pointer text-center block"
            >
              {t.calculator.getQuoteBtn}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
