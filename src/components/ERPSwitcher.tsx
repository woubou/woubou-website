import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {
  ERP_MOCKUP_IMAGE,
  INITIAL_FINANCIALS,
  INITIAL_INVENTORY,
  INITIAL_CRM_LEADS,
  INITIAL_WORKFLOW_JOBS
} from '../data/initialData';
import { InventoryItem, CRMLead, WorkflowJob } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ERPSwitcherProps {
  onOpenTestDrive: () => void;
  embedded?: boolean;
}

export const ERPSwitcher: React.FC<ERPSwitcherProps> = ({ onOpenTestDrive, embedded = false }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'financials' | 'inventory' | 'crm' | 'workflow'>('financials');

  // Interactive local states for testing real ERP capabilities
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [inventorySearch, setInventorySearch] = useState('');
  const [crmLeads] = useState<CRMLead[]>(INITIAL_CRM_LEADS);
  const [workflowJobs, setWorkflowJobs] = useState<WorkflowJob[]>(INITIAL_WORKFLOW_JOBS);

  // New item state
  const [newItemName, setNewItemName] = useState('');
  const [newItemStock, setNewItemStock] = useState('50');

  const handleAddStock = (id: string) => {
    setInventoryList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              stock: item.stock + 25,
              status: item.stock + 25 > item.reorderLevel ? 'In Stock' : 'Low Stock'
            }
          : item
      )
    );
  };

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      sku: `SKU-${Math.floor(100 + Math.random() * 800)}`,
      name: newItemName,
      category: 'Hardware',
      stock: parseInt(newItemStock) || 10,
      reorderLevel: 15,
      unitPrice: 650,
      status: parseInt(newItemStock) > 15 ? 'In Stock' : 'Low Stock'
    };
    setInventoryList([newItem, ...inventoryList]);
    setNewItemName('');
  };

  const advanceJobStage = (jobId: string) => {
    const stages: WorkflowJob['stage'][] = ['Design', 'Production', 'Quality Control', 'Dispatched'];
    setWorkflowJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          const currentIndex = stages.indexOf(job.stage);
          const nextIndex = Math.min(currentIndex + 1, stages.length - 1);
          return { ...job, stage: stages[nextIndex] };
        }
        return job;
      })
    );
  };

  const filteredInventory = inventoryList.filter((item) =>
    item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    item.sku.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  return (
    <section className={embedded ? 'space-y-10' : 'py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto'}>
      {/* Top Banner / Feature Intro */}
      <div className={`bg-[#ffffff] dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-[#026177]/15 dark:border-white/10 shadow-xl ${embedded ? '' : 'mb-16'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-2xl border border-[#026177]/20 dark:border-white/15 relative group">
              <img
                src={ERP_MOCKUP_IMAGE}
                alt="Woubou ERP Laptop Dashboard Preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <span className="text-white font-mono-caps text-xs tracking-wider bg-[#026177]/90 px-3 py-1.5 rounded-md backdrop-blur-sm">
                  Woubou ERP — Live System
                </span>
              </div>
            </div>
          </div>

          {/* Right: Copy & Bullet Points */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono-caps text-xs font-semibold text-[#b52703] dark:text-[#ffb4a3] tracking-widest uppercase">
              {t.erp.badge}
            </span>
            <h2 className="font-geist text-3xl sm:text-4xl font-bold text-[#004859] dark:text-white leading-tight">
              {t.erp.title}
            </h2>
            <p className="font-inter text-base text-[#3f484c] dark:text-slate-300 leading-relaxed">
              {t.erp.description}
            </p>

            <ul className="space-y-3 font-inter text-sm text-[#131b2e] dark:text-slate-200">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b52703] dark:text-[#fc5935] text-xl">
                  check_circle
                </span>
                <span className="font-medium">{t.erp.bullet1}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b52703] dark:text-[#fc5935] text-xl">
                  check_circle
                </span>
                <span className="font-medium">{t.erp.bullet2}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b52703] dark:text-[#fc5935] text-xl">
                  check_circle
                </span>
                <span className="font-medium">{t.erp.bullet3}</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-4">
              {/* Direct Link to erp.woubou.com */}
              <a
                href="https://erp.woubou.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-emerald-600 dark:bg-emerald-600 text-white font-mono-caps text-xs font-semibold tracking-wider uppercase hover:bg-emerald-700 transition-all shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">open_in_new</span>
                {t.erp.directLinkBtn}
              </a>

              {/* Sandbox Modal trigger */}
              <button
                onClick={onOpenTestDrive}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#004859] text-white font-mono-caps text-xs font-semibold tracking-wider uppercase hover:bg-[#026177] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">terminal</span>
                {t.erp.sandboxBtn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive ERP Live Modules Playground */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#026177]/15 dark:border-white/10 pb-4">
          <div>
            <h3 className="font-geist text-2xl font-bold text-[#004859] dark:text-white">
              {t.erp.playgroundTitle}
            </h3>
            <p className="font-inter text-sm text-[#3f484c] dark:text-slate-400">
              {t.erp.playgroundDesc}
            </p>
          </div>

          {/* Module Navigation Tabs */}
          <div className="flex flex-wrap gap-1 bg-[#eaedff] dark:bg-slate-800 p-1.5 rounded-xl border border-[#026177]/10 dark:border-white/10">
            <button
              onClick={() => setActiveTab('financials')}
              className={`px-4 py-2 rounded-lg font-mono-caps text-xs font-medium transition-all ${
                activeTab === 'financials'
                  ? 'bg-[#004859] text-white shadow-sm'
                  : 'text-[#3f484c] dark:text-slate-300 hover:text-[#004859] dark:hover:text-white'
              }`}
            >
              {t.erp.tabFinancials}
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-lg font-mono-caps text-xs font-medium transition-all ${
                activeTab === 'inventory'
                  ? 'bg-[#004859] text-white shadow-sm'
                  : 'text-[#3f484c] dark:text-slate-300 hover:text-[#004859] dark:hover:text-white'
              }`}
            >
              {t.erp.tabInventory} ({inventoryList.length})
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className={`px-4 py-2 rounded-lg font-mono-caps text-xs font-medium transition-all ${
                activeTab === 'crm'
                  ? 'bg-[#004859] text-white shadow-sm'
                  : 'text-[#3f484c] dark:text-slate-300 hover:text-[#004859] dark:hover:text-white'
              }`}
            >
              {t.erp.tabCrm}
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-4 py-2 rounded-lg font-mono-caps text-xs font-medium transition-all ${
                activeTab === 'workflow'
                  ? 'bg-[#004859] text-white shadow-sm'
                  : 'text-[#3f484c] dark:text-slate-300 hover:text-[#004859] dark:hover:text-white'
              }`}
            >
              {t.erp.tabWorkflow}
            </button>
          </div>
        </div>

        {/* TAB 1: FINANCIAL OVERVIEW */}
        {activeTab === 'financials' && (
          <div className="bg-[#ffffff] dark:bg-slate-900 rounded-2xl p-6 border border-[#026177]/15 dark:border-white/10 shadow-lg space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#eaedff]/60 dark:bg-slate-800 border border-[#026177]/10 dark:border-white/5">
                <span className="font-mono-caps text-xs text-[#3f484c] dark:text-slate-400">{t.erp.ytdRevenue}</span>
                <div className="font-geist text-2xl font-bold text-[#004859] dark:text-[#8ad0ea] mt-1">$1,218,000</div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t.erp.ytdGrowth}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#eaedff]/60 dark:bg-slate-800 border border-[#026177]/10 dark:border-white/5">
                <span className="font-mono-caps text-xs text-[#3f484c] dark:text-slate-400">{t.erp.expenses}</span>
                <div className="font-geist text-2xl font-bold text-[#b52703] dark:text-[#ffb4a3] mt-1">$616,000</div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.erp.expensesTarget}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#eaedff]/60 dark:bg-slate-800 border border-[#026177]/10 dark:border-white/5">
                <span className="font-mono-caps text-xs text-[#3f484c] dark:text-slate-400">{t.erp.profitMargin}</span>
                <div className="font-geist text-2xl font-bold text-[#131b2e] dark:text-white mt-1">$602,000 (49.4%)</div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t.erp.marginExpansion}</span>
              </div>
            </div>

            {/* Recharts Financial Chart */}
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={INITIAL_FINANCIALS}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#026177" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#026177" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b52703" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#b52703" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#6f787c" fontSize={12} />
                  <YAxis stroke="#6f787c" fontSize={12} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#026177" fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#b52703" fillOpacity={1} fill="url(#colorExp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="bg-[#ffffff] dark:bg-slate-900 rounded-2xl p-6 border border-[#026177]/15 dark:border-white/10 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#6f787c] text-xl">
                  search
                </span>
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder={t.erp.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#eaedff]/50 dark:bg-slate-800 border border-[#026177]/20 dark:border-white/15 text-sm text-[#131b2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#026177]"
                />
              </div>

              {/* Add Quick SKU Form */}
              <form onSubmit={handleAddInventory} className="flex gap-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={t.erp.newItemPlaceholder}
                  className="px-3 py-2 rounded-lg bg-[#eaedff]/50 dark:bg-slate-800 border border-[#026177]/20 dark:border-white/15 text-sm text-[#131b2e] dark:text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#026177] text-white font-mono-caps text-xs hover:bg-[#004859] transition-colors"
                >
                  {t.erp.addSkuBtn}
                </button>
              </form>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-inter">
                <thead>
                  <tr className="border-b border-[#026177]/10 dark:border-white/10 text-xs font-mono-caps text-[#6f787c] dark:text-slate-400">
                    <th className="py-3 px-3">{t.erp.thSku}</th>
                    <th className="py-3 px-3">{t.erp.thName}</th>
                    <th className="py-3 px-3">{t.erp.thCategory}</th>
                    <th className="py-3 px-3">{t.erp.thStock}</th>
                    <th className="py-3 px-3">{t.erp.thPrice}</th>
                    <th className="py-3 px-3">{t.erp.thStatus}</th>
                    <th className="py-3 px-3 text-right">{t.erp.thActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#026177]/10 dark:divide-white/5">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-[#eaedff]/30 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-3 font-mono-caps text-xs font-semibold text-[#026177] dark:text-[#8ad0ea]">
                        {item.sku}
                      </td>
                      <td className="py-3 px-3 font-medium text-[#131b2e] dark:text-white">{item.name}</td>
                      <td className="py-3 px-3 text-[#3f484c] dark:text-slate-400">{item.category}</td>
                      <td className="py-3 px-3 font-bold text-[#131b2e] dark:text-slate-200">{item.stock} units</td>
                      <td className="py-3 px-3 text-[#131b2e] dark:text-slate-200">${item.unitPrice.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono-caps tracking-wider ${
                            item.status === 'In Stock'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : item.status === 'Low Stock'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {item.status === 'In Stock' ? t.erp.inStock : item.status === 'Low Stock' ? t.erp.lowStock : t.erp.outOfStock}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleAddStock(item.id)}
                          className="px-2.5 py-1 rounded bg-[#026177]/10 text-[#026177] dark:bg-white/10 dark:text-[#8ad0ea] hover:bg-[#026177] hover:text-white font-mono-caps text-[10px] transition-colors"
                        >
                          {t.erp.restockBtn}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CRM PIPELINE */}
        {activeTab === 'crm' && (
          <div className="bg-[#ffffff] dark:bg-slate-900 rounded-2xl p-6 border border-[#026177]/15 dark:border-white/10 shadow-lg space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { key: 'Prospect', label: t.erp.prospect },
                { key: 'In Discussion', label: t.erp.inDiscussion },
                { key: 'Proposal Sent', label: t.erp.proposalSent },
                { key: 'Closed Won', label: t.erp.closedWon }
              ].map((stageObj) => {
                const stageLeads = crmLeads.filter((l) => l.stage === stageObj.key);
                const totalValue = stageLeads.reduce((acc, l) => acc + l.value, 0);

                return (
                  <div key={stageObj.key} className="p-4 rounded-xl bg-[#eaedff]/50 dark:bg-slate-800/60 border border-[#026177]/10 dark:border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-caps text-xs font-bold text-[#004859] dark:text-[#8ad0ea]">
                        {stageObj.label}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#026177]/10 dark:bg-white/10 text-[10px] font-bold text-[#026177] dark:text-[#8ad0ea]">
                        {stageLeads.length}
                      </span>
                    </div>
                    <div className="text-xs text-[#3f484c] dark:text-slate-400">
                      {t.erp.total}: <span className="font-bold text-[#131b2e] dark:text-white">${totalValue.toLocaleString()}</span>
                    </div>

                    <div className="space-y-2 pt-2">
                      {stageLeads.map((lead) => (
                        <div key={lead.id} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-[#026177]/15 dark:border-white/10 shadow-sm space-y-1">
                          <div className="font-semibold text-sm text-[#131b2e] dark:text-white">{lead.companyName}</div>
                          <div className="text-xs text-[#3f484c] dark:text-slate-400">{lead.contactPerson}</div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="font-bold text-xs text-[#b52703] dark:text-[#ffb4a3]">
                              ${lead.value.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-mono-caps text-emerald-600 dark:text-emerald-400">
                              {lead.probability}% {t.erp.prob}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: WORKFLOW AUTOMATION */}
        {activeTab === 'workflow' && (
          <div className="bg-[#ffffff] dark:bg-slate-900 rounded-2xl p-6 border border-[#026177]/15 dark:border-white/10 shadow-lg space-y-6">
            <div className="space-y-4">
              {workflowJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-[#eaedff]/40 dark:bg-slate-800/50 border border-[#026177]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-caps text-xs font-bold text-[#026177] dark:text-[#8ad0ea]">
                        {job.orderNumber}
                      </span>
                      <span className="text-sm font-semibold text-[#131b2e] dark:text-white">
                        {job.client}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono-caps ${
                          job.priority === 'High' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {job.priority === 'High' ? t.erp.priorityHigh : job.priority === 'Medium' ? t.erp.priorityMedium : t.erp.priorityLow}
                      </span>
                    </div>
                    <div className="text-xs text-[#3f484c] dark:text-slate-400">
                      {t.erp.assignedTo}: {job.assignedTo} | {t.erp.dueDate}: {job.dueDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#004859] text-white font-mono-caps text-xs font-medium">
                      {t.erp.stageLabel}: {job.stage}
                    </span>
                    {job.stage !== 'Dispatched' && (
                      <button
                        onClick={() => advanceJobStage(job.id)}
                        className="px-3 py-1 rounded bg-[#b52703] text-white font-mono-caps text-xs hover:bg-[#fc5935] transition-colors"
                      >
                        {t.erp.advanceStageBtn} &rarr;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
