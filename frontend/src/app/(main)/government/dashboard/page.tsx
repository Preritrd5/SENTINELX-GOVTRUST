'use client';
import { useState, useEffect } from 'react';
import { ShieldAlert, Landmark, Database, ShieldCheck, Activity, TrendingUp, Wallet, ArrowRight, RefreshCcw, Bell } from 'lucide-react';
import { InputModes } from '@/components/InputModes';

export default function GovernmentDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info' | 'warn'} | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warn' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const stats = [
    { label: "Treasury Trust", value: "99.9%", sub: "Neural Audited", icon: ShieldCheck, color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10" },
    { label: "Threat Level", value: "Alpha", sub: "Minimal Risk", icon: ShieldAlert, color: "text-sky-400", border: "border-sky-500/40", bg: "bg-sky-500/10" },
    { label: "Total Fund Flow", value: "₹45.2k Cr", sub: "Since inception", icon: Wallet, color: "text-yellow-400", border: "border-yellow-500/40", bg: "bg-yellow-500/10" },
    { label: "Network Load", value: "14%", sub: "Optimized", icon: Activity, color: "text-purple-400", border: "border-purple-500/40", bg: "bg-purple-500/10" },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Global network mesh state refreshed.", "success");
    }, 1000);
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
          <h1 className="text-2xl font-bold text-white">Government <span className="gradient-text">High Command</span></h1>
          <p className="text-slate-300 text-sm mt-1">Sovereign oversight and global security orchestration</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleRefresh} className={`p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
            <RefreshCcw size={16} />
          </button>
          <div className="flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl cursor-help" onClick={() => showToast("DEFCON 5 - All systems secure", "success")}>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">DEFCON 5 - Secure</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`glass-card p-5 border-2 ${s.border} ${s.bg}`}>
            <div className="flex items-start justify-between mb-3">
              <s.icon size={20} className={s.color} />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{s.sub}</span>
            </div>
            <p className="text-3xl font-black text-white">{s.value}</p>
            <p className="text-sm text-slate-300 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-card p-6 border-t-2 border-sky-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Global Infrastructure Mesh</h3>
              <span className="status-badge text-emerald-300 border-emerald-400/50 bg-emerald-500/15">99.9% Sync</span>
            </div>
            <div className="relative h-48 bg-[#0b1628] border border-[#1e3a6e] rounded-2xl overflow-hidden mb-6 group cursor-crosshair" onClick={() => alert("Coordinate SX-LAT-29 pinged. Latency: 4.2ms")}>
              <div className="absolute inset-0 cyber-grid opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                 {/* Visual representation of a globe/network */}
                 <div className="w-32 h-32 rounded-full border border-sky-500/30 animate-ping absolute" />
                 <div className="w-24 h-24 rounded-full border border-sky-500/50 animate-pulse absolute" />
                 <Landmark size={48} className="text-sky-400 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                 <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <span className="text-[8px] text-slate-500 uppercase font-bold">Region: Central</span>
                 </div>
                 <span className="text-[8px] text-sky-500/50 font-mono">LATENCY: 4.2ms</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
               {[
                 { label: "Nodes", value: "1,402", status: "Online" },
                 { label: "Validations", value: "48.2M", status: "Active" },
                 { label: "Trust Score", value: "99.9", status: "Prime" },
               ].map((m, i) => (
                 <div key={i} className="p-3 bg-[#0f2244] border border-[#1e3a6e] rounded-xl text-center hover:border-sky-500/30 transition-all cursor-pointer" onClick={() => alert(`Node cluster SX-${i} status: OPTIMAL`)}>
                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.label}</p>
                    <p className="text-sm font-black text-white">{m.value}</p>
                 </div>
               ))}
            </div>
          </div>
          
          <InputModes />
        </div>

        <div className="glass-card p-6 border-t-2 border-yellow-500">
          <h3 className="text-lg font-bold text-white mb-6">Fund Allocation Pulse</h3>
          <div className="space-y-4">
            {[
              { name: "Public Health", amount: "₹1,200 Cr", status: "Approved" },
              { name: "Rural Dev", amount: "₹850 Cr", status: "In Escrow" },
              { name: "Smart City", amount: "₹2.1k Cr", status: "Auditing" },
              { name: "Education", amount: "₹420 Cr", status: "Approved" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col gap-2 p-3 bg-[#0f2244] border border-[#1e3a6e] rounded-xl">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{f.name}</span>
                    <span className="text-xs font-black text-sky-400">{f.amount}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] text-slate-500 uppercase">{f.status}</span>
                    <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400 rounded-full" style={{ width: f.status === 'Approved' ? '100%' : '60%' }} />
                    </div>
                 </div>
              </div>
            ))}
          </div>
          <button className="w-full btn-primary text-xs mt-6 flex items-center justify-center gap-2">
            New Allocation <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
