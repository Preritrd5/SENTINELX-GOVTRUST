import { UserCheck, Shield, Key, Search, UserMinus, Edit3, Lock } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { name: "Admin Root", email: "admin@sentinel.x", role: "Super Admin", access: "L7", status: "Active" },
    { name: "Vikram Seth", email: "vikram@gov.in", role: "Ministry Head", access: "L5", status: "Active" },
    { name: "Priya Sharma", email: "priya@welfare.org", role: "Org Admin", access: "L3", status: "Active" },
    { name: "Rahul Deshmukh", email: "rahul@verification.gov", role: "Auditor", access: "L4", status: "Suspended" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Identity & <span className="gradient-text">Governance</span></h1>
          <p className="text-slate-300 text-sm mt-1">Global user management and granular role-based access control</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserCheck size={18} />
          Create Security Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Active Privileged Users", value: "48", icon: Shield, color: "text-sky-400" },
          { label: "Pending Authorizations", value: "3", icon: Key, color: "text-yellow-400" },
          { label: "System Health", value: "99.9%", icon: UserCheck, color: "text-emerald-400" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-6 border-b-2 border-transparent hover:border-sky-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${s.color}`}>
                <s.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-white">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card">
        <div className="p-4 border-b border-sky-900/30 flex items-center justify-between bg-white/5">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search identity..." className="bg-[#0b1628] border border-[#1e3a6e] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-sky-500 outline-none w-64" />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-[#0f2244] border border-[#1e3a6e] rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all">Export Logs</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0f2244]/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <th className="px-6 py-4">Identity</th>
                <th className="px-6 py-4">Governing Role</th>
                <th className="px-6 py-4">Auth Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/20">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-xs border border-sky-500/20">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{user.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] font-black border border-sky-500/30">
                      {user.access}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      <span className="text-xs text-slate-300">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10">
                        <Edit3 size={14} />
                      </button>
                      <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10">
                        <Lock size={14} />
                      </button>
                      <button className="p-2 bg-white/5 rounded-lg text-red-400/50 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20">
                        <UserMinus size={14} />
                      </button>
                    </div>
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
