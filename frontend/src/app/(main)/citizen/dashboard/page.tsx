'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, Database, Clock, User, ArrowRight, ShieldAlert, Zap, Search, Bell } from 'lucide-react';
import { InputModes } from '@/components/InputModes';

export default function CitizenDashboard() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info' | 'warn'} | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warn' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const stats = [
    { label: "Trust Rating", value: "99.9%", sub: "High Reputation", icon: ShieldCheck, color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10" },
    { label: "Active Requests", value: "2", sub: "Processing", icon: Clock, color: "text-sky-400", border: "border-sky-500/40", bg: "bg-sky-500/10" },
    { label: "Blockchain Sync", value: "Synced", sub: "Real-time", icon: Database, color: "text-yellow-400", border: "border-yellow-500/40", bg: "bg-yellow-500/10" },
    { label: "Identity Level", value: "L1", sub: "Public Verified", icon: User, color: "text-purple-400", border: "border-purple-500/40", bg: "bg-purple-500/10" },
  ];

  const handleTrack = () => {
    if (!searchValue) showToast("Please enter a Case ID", "warn");
    else showToast(`Tracking Case ID: ${searchValue}`, "info");
  };

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      showToast("Ledger audit complete. SX-9283-X9 is consistent.", "success");
    }, 2000);
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
          <h1 className="text-2xl font-bold text-white">Citizen <span className="gradient-text">Transparency Portal</span></h1>
          <p className="text-slate-300 text-sm mt-1">Your decentralized gateway to government services and audits</p>
        </div>
        <div className="flex items-center gap-3 bg-[#0f2244] border border-[#1e3a6e] px-4 py-2 rounded-xl">
          <div className="text-right">
            <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Citizen ID</p>
            <p className="text-sm font-mono text-white">SX-9283-X9</p>
          </div>
          <button onClick={handleAudit} disabled={isAuditing} className="btn-primary text-[10px] py-1.5 px-3">
            {isAuditing ? 'Auditing...' : 'Run Audit'}
          </button>
        </div>
      </div>
      {/* Rest of the file... */}

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
              <h3 className="text-lg font-bold text-white">Your Recent Activity</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Case ID..." 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none focus:border-sky-500"
                />
                <button onClick={handleTrack} className="p-1.5 bg-sky-600 rounded-lg text-white hover:bg-sky-500 transition-colors">
                  <Search size={14} />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { title: "Welfare Grant Application", status: "In Progress", date: "2 hours ago", icon: Zap, color: "text-sky-400" },
                { title: "Certificate Verification", status: "Success", date: "Yesterday", icon: ShieldCheck, color: "text-emerald-400" },
                { title: "Complaint sx-902", status: "Resolved", date: "3 days ago", icon: ShieldAlert, color: "text-emerald-400" },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#0f2244] border border-[#1e3a6e] rounded-xl group hover:border-sky-500/40 transition-all cursor-pointer" onClick={() => showToast(`Opening details for: ${act.title}`, "info")}>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-white/5 ${act.color}`}>
                      <act.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{act.title}</p>
                      <p className="text-xs text-slate-500">{act.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 border border-white/10 ${act.color}`}>
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <InputModes />
        </div>

        <div className="glass-card p-6 border-t-2 border-yellow-500">
          <h3 className="text-lg font-bold text-white mb-6">Service Health</h3>
          <div className="space-y-5">
            {[
              { name: "Public Verification", status: "Operational", color: "bg-emerald-400" },
              { name: "Blockchain Ledger", status: "Operational", color: "bg-emerald-400" },
              { name: "AI Fraud Engine", status: "Operational", color: "bg-emerald-400" },
              { name: "Support AI", status: "Busy", color: "bg-yellow-400" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-slate-300 font-medium">{s.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{s.status}</span>
                  <div className={`w-2 h-2 rounded-full ${s.color} animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]`} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
            <p className="text-xs text-sky-400 font-bold mb-2 uppercase tracking-widest">Notice</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              New identity verification protocols (SX-L2) are now available. Update your profile to access advanced fund tracking.
            </p>
            <button className="flex items-center gap-2 text-xs font-bold text-white mt-3 group">
              Update Now <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
