import { Users, UserPlus, Filter, MoreVertical, ShieldCheck, Mail, Phone } from 'lucide-react';

export default function BeneficiariesPage() {
  const beneficiaries = [
    { name: "Arjun Mehta", id: "BEN-001", type: "Farmer Welfare", status: "Active", risk: "Low" },
    { name: "Sarah Williams", id: "BEN-002", type: "Education Grant", status: "Pending", risk: "Medium" },
    { name: "Rajesh Kumar", id: "BEN-003", type: "Medical Aid", status: "Verified", risk: "Low" },
    { name: "Ananya Iyer", id: "BEN-004", type: "Housing Subsidy", status: "Active", risk: "Low" },
    { name: "David Chen", id: "BEN-005", type: "Startup Fund", status: "Flagged", risk: "High" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Beneficiary <span className="gradient-text">Management</span></h1>
          <p className="text-slate-300 text-sm mt-1">Onboard, verify, and monitor program participants</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus size={18} />
          Add Beneficiary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Enrolled", value: "1,284", icon: Users, color: "text-sky-400" },
          { label: "Identity Verified", value: "98.2%", icon: ShieldCheck, color: "text-emerald-400" },
          { label: "Active Programs", value: "12", icon: Filter, color: "text-yellow-400" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 border-l-4 border-sky-500/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-white mt-1">{s.value}</p>
              </div>
              <s.icon size={24} className={s.color} />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-sky-900/30 flex items-center justify-between bg-white/5">
          <h3 className="font-bold text-white">All Beneficiaries</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-[#0f2244] border border-[#1e3a6e] rounded-lg text-slate-400 hover:text-white transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0f2244]/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <th className="px-6 py-4">Name / ID</th>
                <th className="px-6 py-4">Program Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Risk Profile</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/20">
              {beneficiaries.map((ben, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-white">{ben.name}</p>
                    <p className="text-xs text-slate-400">{ben.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{ben.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      ben.status === 'Active' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
                      ben.status === 'Pending' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' :
                      ben.status === 'Flagged' ? 'text-red-400 border-red-500/30 bg-red-500/10' :
                      'text-sky-400 border-sky-500/30 bg-sky-500/10'
                    }`}>
                      {ben.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        ben.risk === 'Low' ? 'bg-emerald-400' :
                        ben.risk === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                      <span className="text-xs text-slate-300">{ben.risk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
