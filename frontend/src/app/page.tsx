'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield, ArrowRight, User, Building2, Landmark,
  Brain, Link2, Eye, Lock, CheckCircle2, Phone, Mail, MapPin, Globe
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [role, setRole] = useState<'CITIZEN' | 'ADMIN' | 'GOVERNMENT'>('CITIZEN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState('');

  if (!mounted) return null;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const endpoint = mode === 'LOGIN' ? '/api/auth/login' : '/api/auth/register';
    try {
      const payload: any = {
        username, password,
        role: role === 'CITIZEN' ? 'Citizen' : role === 'ADMIN' ? 'Admin' : 'Gov'
      };
      if (mode === 'SIGNUP') { payload.email = email; payload.full_name = fullName; payload.organization = organization; }
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Authentication failed');
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.user_id.toString());
      const dashboardPath = data.role === 'Citizen' ? '/citizen/dashboard' :
                          data.role === 'Admin' ? '/admin/dashboard' : '/government/dashboard';
      router.push(dashboardPath);
    } catch (err: any) {
      setError(err.message || 'Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div className="sky-glow top-0 left-0 w-[600px] h-[600px]" />
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: 'rgba(6, 14, 26, 0.75)', borderBottom: '1px solid rgba(14,165,233,0.12)' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-950/60 rounded-xl border border-sky-500/20">
              <Shield className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <span className="text-base font-black text-white">SENTINEL<span className="text-sky-500">X</span> <span className="text-slate-300">Vemana</span></span>
              <p className="text-[9px] font-bold text-sky-500/50 uppercase tracking-widest leading-none">Digital Sovereignty</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', href: '#hero' },
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Contact', href: '#footer' },
            ].map((link) => (
              <a key={link.label} href={link.href}
                className="text-slate-400 text-xs font-bold uppercase tracking-wider hover:text-sky-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Live</span>
            </div>
            {/* <a href="#login"
              className="btn-primary !py-2 !px-5 !text-xs flex items-center gap-1.5">
              Sign In <ArrowRight size={12} />
            </a> */}
          </div>
        </div>
      </nav>

      {/* ── HERO + LOGIN ── */}
      <section id="hero" className="flex-1 flex items-center justify-center p-6 min-h-screen z-10 pt-20">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Hero */}
          <div className="hidden lg:flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <div className="p-5 bg-sky-950/50 rounded-2xl border border-sky-500/20 shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                <Shield className="w-12 h-12 text-sky-400" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-white">SENTINEL<span className="text-sky-500">X</span> <span>Vemana</span></h1>
                <p className="text-sm font-bold text-sky-500/60 uppercase tracking-widest mt-1">Digital Sovereignty</p>
              </div>
            </div>

            <div>
              <h2 className="text-8xl font-black leading-tight tracking-tighter text-white">
                DEEP<br /><span className="gradient-text">BLUE</span><br />TRUST
              </h2>
              <p className="text-slate-400 text-base mt-6 leading-relaxed border-l-2 border-sky-500 pl-4 max-w-sm">
                Government-grade security powered by Neural Verification and Blockchain.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(14,165,233,1)]" />
              <span className="text-sky-500/60 text-xs font-bold uppercase tracking-widest">All Systems Nominal</span>
            </div>
          </div>

          {/* Auth Card */}
          <div className="glass-card p-8 space-y-6 border-t-4 border-sky-600">
            <div className="flex items-center gap-2 lg:hidden">
              <Shield className="w-5 h-5 text-sky-400" />
              <span className="text-lg font-black text-white">SENTINEL<span className="text-sky-400">X</span></span>
            </div>

            <div className="flex bg-[#0f2244] p-1.5 rounded-xl gap-1.5 border border-[#2a4a6e]">
              {(['LOGIN', 'SIGNUP'] as const).map((m) => (
                <button 
                  key={m} 
                  onClick={() => { setMode(m); setError(''); }}
                  suppressHydrationWarning
                  className={`flex-1 py-3.5 rounded-lg transition-all text-xs font-black uppercase tracking-[0.15em] ${
                    mode === m ? 'bg-sky-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'text-slate-500 hover:text-sky-400'
                  }`}>
                  {m === 'LOGIN' ? 'Secure Login' : 'System Registration'}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">{mode === 'LOGIN' ? 'Portal Access' : 'Create Account'}</h3>
              <p className="text-slate-500 text-xs mt-1">Secure government authentication gateway</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-xs font-bold animate-shake">
                {error}
              </div>
            )}

            <div className="flex bg-[#0f2244] p-1 rounded-xl gap-1 border border-[#2a4a6e]">
              {[
                { id: 'CITIZEN', icon: <User size={14} />, label: 'Citizen' },
                { id: 'ADMIN', icon: <Building2 size={14} />, label: 'Admin' },
                { id: 'GOVERNMENT', icon: <Landmark size={14} />, label: 'Gov' }
              ].map((t) => (
                <button 
                  key={t.id} 
                  onClick={() => setRole(t.id as any)}
                  suppressHydrationWarning
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all text-xs font-bold ${
                    role === t.id ? 'bg-sky-950/60 text-sky-400 border border-sky-500/30' : 'text-slate-600 hover:text-slate-400'
                  }`}>
                  {t.icon}<span>{t.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'SIGNUP' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input type="text" required placeholder="Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)}
                      suppressHydrationWarning
                      className="w-full bg-[#0f2244] border border-[#2a4a6e] rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400 text-white placeholder:text-slate-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                    <input type="email" required placeholder="name@gov.trust" value={email} onChange={(e) => setEmail(e.target.value)}
                      suppressHydrationWarning
                      className="w-full bg-[#0f2244] border border-[#2a4a6e] rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400 text-white placeholder:text-slate-500 transition-all" />
                  </div>
                </>
              )}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Username</label>
                <input type="text" required placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}
                  suppressHydrationWarning
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500/50 text-white placeholder:text-slate-700 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                  suppressHydrationWarning
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500/50 text-white placeholder:text-slate-700 transition-all" />
              </div>
              <button type="submit" disabled={isLoading}
                suppressHydrationWarning
                className="w-full btn-primary !py-3 flex items-center justify-center gap-2 mt-2">
                <span className="tracking-widest">{isLoading ? 'Authenticating...' : mode === 'LOGIN' ? 'Sign In' : 'Create Account'}</span>
                {!isLoading && <ArrowRight size={14} />}
              </button>
            </form>

            <button 
              onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
              suppressHydrationWarning
              className="w-full text-slate-500 text-xs font-bold hover:text-sky-400 transition-colors py-1 text-center">
              {mode === 'LOGIN' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>

          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section id="stats" className="relative z-10 py-14 px-6 border-t border-sky-500/10 bg-[#0a1628]/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-bold text-sky-400/60 uppercase tracking-widest mb-10">Platform at a Glance</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '12,400+', label: 'Complaints Resolved', color: 'text-sky-400' },
              { value: '₹980 Cr', label: 'Funds Tracked on Chain', color: 'text-emerald-400' },
              { value: '99.97%', label: 'AI Detection Accuracy', color: 'text-yellow-400' },
              { value: '3 Roles', label: 'Citizen · Admin · Govt', color: 'text-purple-400' },
            ].map((s) => (
              <div key={s.label} className="glass-card p-6 text-center">
                <p className={`text-4xl font-black ${s.color} mb-2`}>{s.value}</p>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="relative z-10 py-16 px-6 bg-[#071220]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">Core <span className="gradient-text">Capabilities</span></h2>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">Built for modern governments — secured by AI, anchored by blockchain, trusted by citizens.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Brain, title: 'AI Trust Engine', desc: 'Real-time fraud detection and anomaly analysis powered by neural networks.', color: 'text-sky-400', glow: 'border-sky-500/30' },
              { icon: Link2, title: 'Blockchain Ledger', desc: 'Every transaction immutably recorded on a sovereign distributed ledger.', color: 'text-emerald-400', glow: 'border-emerald-500/30' },
              { icon: Eye, title: 'View Transparency', desc: 'Citizens can track government fund flows and complaint resolution in real time.', color: 'text-yellow-400', glow: 'border-yellow-500/30' },
              { icon: Lock, title: 'Role-Based Access', desc: 'Strictly segregated dashboards for Citizens, Admins, and Government officials.', color: 'text-purple-400', glow: 'border-purple-500/30' },
            ].map((f) => (
              <div key={f.title} className={`glass-card p-6 border ${f.glow} hover:scale-105 transition-transform duration-300`}>
                <f.icon size={28} className={`${f.color} mb-4`} />
                <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section id="how-it-works" className="relative z-10 py-16 px-6 bg-[#0a1628]/60 backdrop-blur-sm border-t border-sky-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">How It <span className="gradient-text">Works</span></h2>
            <p className="text-slate-400 text-sm mt-2">Three simple steps to a secure, transparent government experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Register & Authenticate', desc: 'Create your secure account with role-based access. AI verifies your identity instantly.', icon: User },
              { step: '02', title: 'Submit & Track', desc: 'File complaints, track fund allocations, and monitor resolution status in real time.', icon: CheckCircle2 },
              { step: '03', title: 'Verified on Blockchain', desc: 'Every action is hashed and recorded on the immutable ledger for full transparency.', icon: Link2 },
            ].map((w) => (
              <div key={w.step} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.15)]">
                  <w.icon size={28} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-sky-400/40 text-5xl font-black absolute -mt-10 -ml-2 select-none">{w.step}</p>
                  <h3 className="text-white font-bold text-lg mt-2">{w.title}</h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="footer" className="relative z-10 bg-[#060e1a]/80 backdrop-blur-sm border-t border-sky-500/10 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">

            {/* Brand */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="w-7 h-7 text-sky-400" />
                <span className="text-xl font-black text-white">SENTINEL<span className="text-sky-500">X</span> Vemana</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                A sovereign AI-powered cyber-defense and government transparency platform. Built for the future of digital governance.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400/70 text-xs font-bold uppercase tracking-widest">All Systems Operational</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Platform</h4>
              {['Citizen Portal', 'Admin Console', 'Government Hub', 'Blockchain Ledger', 'AI Trust Engine'].map((l) => (
                <p key={l} className="text-slate-400 text-sm hover:text-sky-400 cursor-pointer transition-colors">{l}</p>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Contact</h4>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone size={13} className="text-sky-400 shrink-0" />
                <span>6363276249</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail size={13} className="text-sky-400 shrink-0" />
                <span>preritnitard17@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin size={13} className="text-sky-400 shrink-0" />
                <span>Vemana Institute of Technology, Bangalore</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Globe size={13} className="text-sky-400 shrink-0" />
                <span>sentinelx.gov.in</span>
              </div>
            </div>
          </div>

          <div className="border-t border-sky-500/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-600 text-xs uppercase tracking-widest">
              © 2026 SentinelX Vemana SecureChain GovTrust — Sovereign Digital Infrastructure
            </p>
            <div className="flex items-center gap-4 text-slate-600 text-xs uppercase tracking-wider">
              <span className="hover:text-sky-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-sky-400 cursor-pointer transition-colors">Terms of Use</span>
              <span className="hover:text-sky-400 cursor-pointer transition-colors">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
