import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ERPTestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

interface SampleInvoice {
  id: string;
  client: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export const ERPTestDriveModal: React.FC<ERPTestDriveModalProps> = ({
  isOpen,
  onClose,
  onOpenContact
}) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const [activeView, setActiveView] = useState<'overview' | 'invoices' | 'logs'>('overview');

  // Interactive Sandbox Data State
  const [invoices, setInvoices] = useState<SampleInvoice[]>([
    { id: 'INV-2026-001', client: 'Acme Logistics Ltd', amount: 12500, date: '2026-08-01', status: 'Paid' },
    { id: 'INV-2026-002', client: 'TechPro Global Solutions', amount: 8400, date: '2026-08-04', status: 'Pending' },
    { id: 'INV-2026-003', client: 'Apex Retail Group', amount: 18900, date: '2026-08-06', status: 'Paid' }
  ]);

  const [logs, setLogs] = useState<string[]>([
    '08:12:04 AM - System initialization complete.',
    '08:12:05 AM - Connected to PostgreSQL master instance.',
    '08:14:22 AM - Sync complete: 5 modules operational.'
  ]);

  const [newClientName, setNewClientName] = useState('');
  const [newAmount, setNewAmount] = useState('4500');

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const inv: SampleInvoice = {
      id: `INV-2026-00${invoices.length + 1}`,
      client: newClientName,
      amount: parseFloat(newAmount) || 2500,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    setInvoices([inv, ...invoices]);
    setLogs([`Invoice ${inv.id} generated for ${inv.client} ($${inv.amount})`, ...logs]);
    setNewClientName('');
  };

  const markInvoicePaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv))
    );
    setLogs([`Invoice ${id} marked as PAID. Accounting Ledger updated.`, ...logs]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0f172a] text-white rounded-3xl shadow-2xl border border-white/15 overflow-hidden flex flex-col sm:flex-row">
        
        {/* Sidebar */}
        <div className="w-full sm:w-64 bg-slate-900 p-5 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#026177]"></div>
                <span className="font-geist font-bold text-lg text-white">Woubou ERP</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono-caps text-[10px]">
                SANDBOX
              </span>
            </div>

            <nav className="space-y-1 font-mono-caps text-xs">
              <button
                onClick={() => setActiveView('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  activeView === 'overview'
                    ? 'bg-[#026177] text-white font-semibold'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-lg">dashboard</span>
                {t.sandboxModal.dashboard}
              </button>

              <button
                onClick={() => setActiveView('invoices')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  activeView === 'invoices'
                    ? 'bg-[#026177] text-white font-semibold'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-lg">receipt_long</span>
                {t.sandboxModal.invoices}
              </button>

              <button
                onClick={() => setActiveView('logs')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  activeView === 'logs'
                    ? 'bg-[#026177] text-white font-semibold'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-lg">terminal</span>
                {t.sandboxModal.auditLogs} ({logs.length})
              </button>
            </nav>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <a
              href="https://erp.woubou.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-mono-caps text-xs font-semibold hover:bg-emerald-500 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              {t.sandboxModal.directErpLink}
            </a>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-lg bg-[#b52703] text-white font-mono-caps text-xs font-semibold hover:bg-[#fc5935] transition-all"
            >
              {t.sandboxModal.requestCustom}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-lg bg-white/10 text-slate-300 font-mono-caps text-xs hover:bg-white/20"
            >
              {t.sandboxModal.exitSandbox}
            </button>
          </div>
        </div>

        {/* Main Content Pane */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#0f172a]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-geist text-2xl font-bold text-white">
                {activeView === 'overview' && t.sandboxModal.title}
                {activeView === 'invoices' && t.sandboxModal.invoices}
                {activeView === 'logs' && t.sandboxModal.auditLogs}
              </h2>
              <p className="font-inter text-xs text-slate-400">
                {t.sandboxModal.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* VIEW 1: OVERVIEW */}
          {activeView === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                  <div className="text-xs font-mono-caps text-slate-400">{t.sandboxModal.totalBilled}</div>
                  <div className="font-geist text-2xl font-bold text-[#8ad0ea] mt-1">
                    ${invoices.reduce((a, b) => a + b.amount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                  <div className="text-xs font-mono-caps text-slate-400">{t.sandboxModal.pendingPayments}</div>
                  <div className="font-geist text-2xl font-bold text-[#ffb4a3] mt-1">
                    ${invoices.filter((i) => i.status === 'Pending').reduce((a, b) => a + b.amount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                  <div className="text-xs font-mono-caps text-slate-400">{t.sandboxModal.dbUptime}</div>
                  <div className="font-geist text-2xl font-bold text-emerald-400 mt-1">
                    99.99%
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-4">
                <h3 className="font-geist text-lg font-bold">{t.sandboxModal.quickActions}</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveView('invoices')}
                    className="px-4 py-2.5 rounded-lg bg-[#026177] text-white font-mono-caps text-xs hover:bg-[#004859] cursor-pointer"
                  >
                    {t.sandboxModal.createNewInvoice}
                  </button>
                  <button
                    onClick={() => {
                      setLogs([`Ran automated inventory reconciliation scan at ${new Date().toLocaleTimeString()}`, ...logs]);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-white/10 text-white font-mono-caps text-xs hover:bg-white/20 cursor-pointer"
                  >
                    {t.sandboxModal.runScan}
                  </button>
                  <a
                    href="https://erp.woubou.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-mono-caps text-xs hover:bg-emerald-500 inline-flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    erp.woubou.com
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: INVOICES */}
          {activeView === 'invoices' && (
            <div className="space-y-6">
              {/* Form */}
              <form onSubmit={handleGenerateInvoice} className="p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-mono-caps text-slate-400 mb-1">{t.sandboxModal.clientName}</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Orion Heavy Industries"
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-white/15 text-sm focus:outline-none focus:ring-1 focus:ring-[#8ad0ea]"
                  />
                </div>
                <div className="w-full sm:w-36">
                  <label className="block text-[11px] font-mono-caps text-slate-400 mb-1">{t.sandboxModal.amount}</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-white/15 text-sm focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded bg-[#026177] text-white font-mono-caps text-xs hover:bg-[#004859] cursor-pointer"
                >
                  {t.sandboxModal.generateBtn}
                </button>
              </form>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900">
                <table className="w-full text-left text-sm font-inter">
                  <thead className="border-b border-white/10 font-mono-caps text-xs text-slate-400">
                    <tr>
                      <th className="py-3 px-4">{t.sandboxModal.thInvId}</th>
                      <th className="py-3 px-4">{t.sandboxModal.thClient}</th>
                      <th className="py-3 px-4">{t.sandboxModal.thAmount}</th>
                      <th className="py-3 px-4">{t.sandboxModal.thDate}</th>
                      <th className="py-3 px-4">{t.sandboxModal.thStatus}</th>
                      <th className="py-3 px-4 text-right">{t.sandboxModal.thAction}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-white/5">
                        <td className="py-3 px-4 font-mono-caps text-xs text-[#8ad0ea]">{inv.id}</td>
                        <td className="py-3 px-4 font-semibold text-white">{inv.client}</td>
                        <td className="py-3 px-4">${inv.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-slate-400">{inv.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono-caps ${
                              inv.status === 'Paid' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {inv.status === 'Pending' && (
                            <button
                              onClick={() => markInvoicePaid(inv.id)}
                              className="px-2.5 py-1 rounded bg-emerald-600 text-white font-mono-caps text-[10px] cursor-pointer"
                            >
                              {t.sandboxModal.markPaid}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 3: LOGS */}
          {activeView === 'logs' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono-caps text-xs space-y-2 text-emerald-400">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-white/5 pb-1">
                  &gt; {log}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
