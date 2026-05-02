import { Building2, Plus, Shield, Users, ArrowUpRight, Search } from 'lucide-react';

export default function DepartmentsPage() {
  const departments = [
    { name: "Public Health", code: "PH-01", leads: 3, employees: 42, status: "Secure", health: 98 },
    { name: "Digital Infrastructure", code: "DI-05", leads: 5, employees: 128, status: "Auditing", health: 85 },
    { name: "Urban Development", code: "UD-12", leads: 2, employees: 34, status: "Secure", health: 94 },
    { name: "Social Welfare", code: "SW-09", leads: 4, employees: 89, status: "Alert", health: 62 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Department <span className="gradient-text">Architecture</span></h1>
          <p className="text-slate-300 text-sm mt-1">Hierarchical structure and security perimeter management</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Create Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept, i) => (
          <div key={i} className="glass-card p-5 group hover:border-sky-500/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-sky-500/10 rounded-xl border border-sky-500/20 group-hover:bg-sky-500/20 transition-all">
                <Building2 size={20} className="text-sky-400" />
              </div>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-sky-400 transition-all" />
            </div>
            <h3 className="font-bold text-white text-lg">{dept.name}</h3>
            <p className="text-xs text-sky-400/70 font-mono mb-4">{dept.code}</p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Leads</p>
                <p className="text-sm font-bold text-white">{dept.leads}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Staff</p>
                <p className="text-sm font-bold text-white">{dept.employees}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-slate-500">Security Health</span>
                <span className={dept.health > 80 ? 'text-emerald-400' : 'text-yellow-400'}>{dept.health}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${dept.health > 80 ? 'bg-emerald-400' : 'bg-yellow-400'}`} 
                  style={{ width: `${dept.health}%` }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 border-l-4 border-emerald-500">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={20} className="text-emerald-400" />
          <h3 className="font-bold text-white text-lg">Cross-Department Trust Mesh</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Departments are isolated in private security sub-nets by default. Enabling "Trust Mesh" allows for secure, audited data sharing between approved sectors.
            </p>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs px-4 py-2">Audit Access Logs</button>
              <button className="btn-primary text-xs px-4 py-2">Configure Mesh</button>
            </div>
          </div>
          
          <div className="bg-[#0f2244] border border-[#1e3a6e] rounded-xl p-4 flex items-center justify-center">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-sky-600 border-2 border-[#0f2244] flex items-center justify-center text-xs font-bold text-white">
                  D{i+1}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center text-xs font-bold text-slate-400">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
