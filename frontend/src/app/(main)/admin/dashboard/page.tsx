'use client';
import { useState, useEffect } from 'react';
import { Users, ShieldCheck, Database, Building2, BarChart3, Clock, ArrowUpRight, TrendingUp, Filter, Bell } from 'lucide-react';
import { InputModes } from '@/components/InputModes';

export default function AdminDashboard() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info' | 'warn'} | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warn' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const stats = [
    { label: "Enrolled Beneficiaries", value: "1,284", sub: "+12% this month", icon: Users, color: "text-sky-400", border: "border-sky-500/40", bg: "bg-sky-500/10" },
    { label: "Organization Health", value: "94%", sub: "Secure Perimeter", icon: ShieldCheck, color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10" },
    { label: "Pending Audits", value: "3", sub: "Priority High", icon: Clock, color: "text-yellow-400", border: "border-yellow-500/40", bg: "bg-yellow-500/10" },
    { label: "System Uptime", value: "99.99%", sub: "L7 Redundant", icon: Database, color: "text-purple-400", border: "border-purple-500/40", bg: "bg-purple-500/10" },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast("Ledger synchronization successful.", "success");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-8 right-8 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl animate-in slide-in-from-right-full duration-300 ${
          toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' :
          toast.type === 'warn' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400' :
          'bg-sky-500/10 border-sky-500/50 text-sky-400'
        }`}>
          <Bell size={18} />
          <span className="text-sm font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin <span className="gradient-text">Control Center</span></h1>
          <p className="text-slate-300 text-sm mt-1">Institutional management and organizational auditing</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => showToast("Opening settings...", "info")} className="px-3 py-1.5 bg-[#0f2244] border border-[#1e3a6e] rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors">
            Settings
          </button>
          <button onClick={handleSync} disabled={isSyncing} className="btn-primary text-xs py-1.5 px-4">
            {isSyncing ? 'Syncing...' : 'Force Sync'}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`glass-card p-5 border-2 ${s.border} ${s.bg}`}>
            <div className="flex items-start justify-between mb-3">
              <s.icon size={20} className={s.color} />
              <TrendingUp size={14} className="text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-white">{s.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{s.label}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-card p-6 border-t-2 border-emerald-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Departmental Oversight</h3>
              <div className="flex gap-2">
                <button onClick={() => alert("Filtering departments...")} className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white"><Filter size={14} /></button>
                <button onClick={() => alert("Full institutional report generating...")} className="text-sky-400 text-xs font-bold flex items-center gap-1 hover:underline">View Full Report <ArrowUpRight size={12} /></button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Public Welfare", health: 98, staff: 42 },
                { name: "Infrastructure", health: 85, staff: 128 },
                { name: "Health Dept", health: 92, staff: 34 },
                { name: "Education", health: 76, staff: 89 },
              ].map((dept, i) => (
                <div key={i} className="p-4 bg-[#0f2244] border border-[#1e3a6e] rounded-xl hover:border-sky-500/30 transition-all cursor-pointer" onClick={() => alert(`Opening ${dept.name} control panel`)}>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-bold text-white">{dept.name}</p>
                    <span className={`text-[10px] font-bold ${dept.health > 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>{dept.health}% Health</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                    <div className={`h-full rounded-full ${dept.health > 80 ? 'bg-emerald-400' : 'bg-yellow-400'}`} style={{ width: `${dept.health}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-500">{dept.staff} active personnel</p>
                </div>
              ))}
            </div>
          </div>
          
          <InputModes />
        </div>

        <div className="glass-card p-6 border-t-2 border-sky-500 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Real-time Audits</h3>
          <div className="flex-1 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-3 items-start p-2 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5" />
                <div>
                  <p className="text-xs font-bold text-white font-mono">0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Asset verification completed</p>
                </div>
                <span className="ml-auto text-[8px] font-bold text-slate-600 uppercase">2m ago</span>
              </div>
            ))}
          </div>
          <button className="w-full btn-secondary text-xs mt-6">Audit Ledger</button>
        </div>
      </div>
    </div>
  );
}
