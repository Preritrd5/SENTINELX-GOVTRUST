import { ShieldCheck, AlertTriangle, Users, Database, ShieldAlert, Activity, TrendingUp } from 'lucide-react';
import { InputModes } from '@/components/InputModes';


export default function Dashboard() {
  const stats = [
    { label: "Trust Score", value: "99.9%", sub: "Neural Verified", icon: ShieldCheck, color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10" },
    { label: "Active Threats", value: "0", sub: "All Clear", icon: ShieldAlert, color: "text-sky-400", border: "border-sky-500/40", bg: "bg-sky-500/10" },
    { label: "Citizens", value: "1,284", sub: "Enrolled", icon: Users, color: "text-yellow-400", border: "border-yellow-500/40", bg: "bg-yellow-500/10" },
    { label: "Transactions", value: "4,921", sub: "On Chain", icon: Database, color: "text-purple-400", border: "border-purple-500/40", bg: "bg-purple-500/10" },
  ];

  const modules = [
    { name: "Government Dashboard", desc: "Fund Tracking", icon: Database, color: "text-sky-400" },
    { name: "Admin Control", desc: "Identity Mgmt", icon: Users, color: "text-yellow-400" },
    { name: "Public Portal", desc: "Transparency", icon: ShieldCheck, color: "text-emerald-400" },
    { name: "SecOps", desc: "Cyber Defense", icon: ShieldAlert, color: "text-red-400" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">GovTrust <span className="gradient-text">Control Plane</span></h1>
        <p className="text-slate-300 text-sm mt-1">Sovereign governance powered by Neural Engines and Blockchain</p>
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

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-card p-6 border-t-2 border-sky-500">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-lg font-bold text-white">AI Neural Engine</h3>
              <p className="text-sm text-slate-300 mt-0.5">Multi-vector fraud & trust analysis</p>
            </div>
            <span className="status-badge text-emerald-300 border-emerald-400/50 bg-emerald-500/15">Operational</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Trust", value: "99.9%", icon: Activity, color: "text-sky-400" },
              { label: "Integrity", value: "Pristine", icon: ShieldCheck, color: "text-yellow-400" },
              { label: "Sync", value: "Atomic", icon: TrendingUp, color: "text-emerald-400" },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0f2244] border border-[#1e3a6e] text-center">
                <m.icon size={18} className={`${m.color} mx-auto mb-2`} />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-sm font-black text-white">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {modules.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#0f2244] border border-[#1e3a6e] hover:border-sky-500/40 transition-all">
                <m.icon size={18} className={m.color} />
                <div>
                  <p className="text-sm font-semibold text-white">{m.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 border-t-2 border-yellow-500">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-white">Ledger Pulse</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
          </div>
          <div className="space-y-2.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#0f2244] rounded-xl border border-[#1e3a6e]">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-black border border-yellow-500/40 shrink-0">BC</div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white font-mono truncate">0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
                  <p className="text-xs text-yellow-400/70 mt-0.5">Validated</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full btn-gold mt-4">Audit Full Ledger</button>
        </div>
      </div>

      <InputModes />
    </div>
  );
}


