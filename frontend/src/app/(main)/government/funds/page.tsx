import { Wallet, Landmark, ArrowUpRight, History, Zap, ShieldCheck, Database } from 'lucide-react';

export default function AllocateFundsPage() {
  const activeAllocations = [
    { title: "Universal Basic Healthcare", amount: "₹1,200 Cr", status: "Transferred", dept: "Public Health" },
    { title: "Smart City Grid Expansion", amount: "₹450 Cr", status: "In Escrow", dept: "Infrastructure" },
    { title: "Farmer Drought Relief", amount: "₹280 Cr", status: "Processing", dept: "Agriculture" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Fund <span className="gradient-text">Orchestration</span></h1>
          <p className="text-slate-300 text-sm mt-1">Direct Treasury-to-Department fund allocation via Smart Contracts</p>
        </div>
        <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
          <Wallet size={18} className="text-emerald-400" />
          <div>
            <p className="text-[10px] font-bold text-emerald-400/70 uppercase">Treasury Balance</p>
            <p className="text-sm font-black text-white">₹14,502.82 Cr</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border-t-2 border-emerald-500">
            <h3 className="text-lg font-bold text-white mb-6">New Allocation Request</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Target Department</label>
                <select className="w-full bg-[#0f2244] border border-[#1e3a6e] rounded-xl px-4 py-3 text-white text-sm focus:border-sky-500 outline-none">
                  <option>Select Department</option>
                  <option>Public Health</option>
                  <option>Education</option>
                  <option>Social Welfare</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Amount (in Cr)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                  <input type="number" placeholder="0.00" className="w-full bg-[#0f2244] border border-[#1e3a6e] rounded-xl pl-8 pr-4 py-3 text-white text-sm focus:border-sky-500 outline-none" />
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl mb-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                <Zap size={20} className="text-sky-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Atomic Settlement</p>
                <p className="text-xs text-slate-400 mt-0.5">Funds will be moved to the department's programmable wallet immediately upon consensus approval.</p>
              </div>
            </div>

            <button className="w-full btn-primary py-3 font-bold text-base shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              Authorize Allocation
            </button>
          </div>

          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <History size={18} className="text-sky-400" />
                Recent Allocations
              </h3>
              <button className="text-sky-400 text-xs font-bold hover:underline">View All</button>
            </div>
            
            <div className="space-y-3">
              {activeAllocations.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#0f2244] rounded-xl border border-[#1e3a6e] hover:border-sky-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Landmark size={20} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.dept}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">{item.amount}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
                      item.status === 'Transferred' ? 'text-emerald-400' : 'text-yellow-400'
                    }`}>{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-t-2 border-yellow-500">
            <h3 className="text-lg font-bold text-white mb-4">Integrity Check</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                <p className="text-xs text-slate-300">All previous allocations have been verified by the AI Neural Engine.</p>
              </div>
              <div className="flex items-start gap-3">
                <Database size={18} className="text-sky-400 shrink-0" />
                <p className="text-xs text-slate-300">Blockchain synchronization is active. Hash consistency: <span className="text-emerald-400 font-mono">VALID</span></p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Settlement Nodes</h3>
            <div className="space-y-4">
              {[
                { name: "Central Treasury Node", status: "Online", latency: "12ms" },
                { name: "RBI Gateway Interface", status: "Online", latency: "45ms" },
                { name: "Blockchain Validator 01", status: "Online", latency: "8ms" },
              ].map((node, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{node.name}</p>
                    <p className="text-[10px] text-slate-400">Latency: {node.latency}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
