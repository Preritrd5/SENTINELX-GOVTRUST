import { BarChart3, PieChart, TrendingUp, Download, Calendar, Filter, FileText, ShieldCheck, Clock, Shield } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">System <span className="gradient-text">Intelligence</span></h1>
          <p className="text-slate-300 text-sm mt-1">Audit logs, performance metrics, and compliance reports</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0f2244] border border-[#1e3a6e] rounded-xl text-sm font-semibold text-white flex items-center gap-2 hover:border-sky-500/50 transition-all">
            <Calendar size={16} />
            Last 30 Days
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Audit Integrity", value: "100%", sub: "Verified on Chain", icon: ShieldCheck, color: "text-emerald-400" },
          { label: "Report Latency", value: "1.2s", sub: "Avg processing time", icon: Clock, color: "text-sky-400" },
          { label: "Compliance Rate", value: "99.4%", sub: "Above threshold", icon: BarChart3, color: "text-yellow-400" },
          { label: "Risk Mitigation", value: "High", sub: "Neural Protected", icon: Shield, color: "text-purple-400" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex justify-between mb-2">
              <s.icon size={18} className={s.color} />
              <TrendingUp size={14} className="text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Activity Timeline</h3>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                    <FileText size={18} className="text-sky-400" />
                  </div>
                  {i !== 3 && <div className="absolute top-10 left-1/2 w-px h-12 bg-sky-900/30" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Organizational Audit Completed</p>
                  <p className="text-xs text-slate-400 mt-0.5">Department: Finance & Welfare • May 2, 2026</p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">PASSED</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-[10px] font-bold border border-white/10">LEDGER-REF: 0x293...</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-6">Department Efficiency</h3>
          <div className="space-y-5">
            {[
              { name: "Welfare", score: 98 },
              { name: "Infrastructure", score: 85 },
              { name: "Public Health", score: 92 },
              { name: "Education", score: 78 },
            ].map((dept, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{dept.name}</span>
                  <span className="text-sky-400">{dept.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.5)]" style={{ width: `${dept.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


