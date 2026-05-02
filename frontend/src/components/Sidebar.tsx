'use client';
import { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserCheck, ShieldAlert, Link as LinkIcon, ShieldHalf, Database, FileBadge, BrainCircuit, ShieldCheck, Shield, LogOut, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const sectors = [
  {
    name: 'CITIZEN (PUBLIC USER)',
    routes: [
      { name: 'Dashboard', path: '/citizen/dashboard', icon: LayoutDashboard },
      { name: 'Sign Up / Login', path: '/', icon: LogOut },
      { name: 'Check Scam Link', path: '/link-scanner', icon: LinkIcon },
      { name: 'Verify Certificate', path: '/certificates', icon: FileBadge },
      { name: 'View Transparency', path: '/blockchain', icon: Database },
      { name: 'Track Complaint / Fund', path: '/citizen/track', icon: ShieldAlert },
    ]
  },
  {
    name: 'ADMIN / ORGANIZATION',
    routes: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Manage Beneficiaries', path: '/admin/beneficiaries', icon: Users },
      { name: 'Verify Certificates', path: '/certificates', icon: FileBadge },
      { name: 'View Reports', path: '/admin/reports', icon: BrainCircuit },
      { name: 'Manage Departments', path: '/admin/departments', icon: Shield },
    ]
  },
  {
    name: 'GOVERNMENT (SUPER ADMIN)',
    routes: [
      { name: 'Dashboard', path: '/government/dashboard', icon: LayoutDashboard },
      { name: 'Allocate Funds', path: '/government/funds', icon: Database },
      { name: 'Monitor System', path: '/dashboard', icon: LayoutDashboard },
      { name: 'View Fraud Alerts', path: '/fraud', icon: ShieldAlert },
      { name: 'Manage Users & Roles', path: '/government/users', icon: UserCheck },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setRole(localStorage.getItem('role'));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const filteredSectors = role
    ? sectors.filter((sector) => {
        const userRole = role.toLowerCase();
        if (userRole === 'citizen' && sector.name.includes('CITIZEN')) return true;
        if (userRole === 'admin' && sector.name.includes('ADMIN')) return true;
        if (userRole === 'government' && sector.name.includes('GOVERNMENT')) return true;
        return false;
      })
    : [];
  
  const sectorsToDisplay = filteredSectors.length > 0 ? filteredSectors : sectors;

  // Avoid hydration mismatch by waiting for client
  if (!isClient) return null;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0b1628] border-r border-sky-900/40 flex flex-col py-6 px-4 z-50 shadow-xl overflow-y-auto custom-scrollbar">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="p-2.5 bg-sky-600 rounded-xl shadow-lg shadow-sky-600/30">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-base font-black tracking-tight text-white leading-none">Sentinel<span className="text-sky-400">X</span></h2>
          <p className="text-[10px] font-bold text-sky-400/60 uppercase tracking-widest mt-0.5">GovTrust</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-6">
        {sectorsToDisplay.map((sector) => (
          <div key={sector.name} className="space-y-2">
            <h3 className="text-[10px] font-bold text-sky-400/50 uppercase tracking-[0.2em] px-3 mb-3">
              {sector.name}
            </h3>
            <div className="space-y-1">
              {sector.routes.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link key={link.path} href={link.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group text-[13px] font-semibold ${
                      isActive
                        ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.1)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}>
                    <link.icon size={15} className={isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-sky-400 transition-colors'} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Divider */}
      <div className="h-px bg-sky-900/30 my-6" />

      {/* Footer */}
      <div className="space-y-1 pt-2">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8">
          <div className="w-8 h-8 rounded-full bg-sky-600/30 flex items-center justify-center text-sky-300 font-black border border-sky-500/30 text-xs shrink-0 uppercase">
            {role ? role.substring(0, 2) : 'US'}
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none capitalize">{role || 'User'}</p>
            <p className="text-xs text-sky-400/70 mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> {role === 'government' ? 'Level 7 Auth' : role === 'admin' ? 'Level 4 Auth' : 'Standard Auth'}
            </p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-red-400 bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm font-bold uppercase tracking-widest mt-2 group">
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Sign Out System</span>
        </button>
      </div>
    </aside>
  );
}

