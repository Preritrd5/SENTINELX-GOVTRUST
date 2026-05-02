'use client';
import { useState } from 'react';
import { Search, MapPin, Clock, CheckCircle2, AlertCircle, ArrowRight, Loader2, FileText, Phone, Mail, Info } from 'lucide-react';

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [activeCase, setActiveCase] = useState('CASE-9283-X9');

  const statusSteps = [
    { label: "Submitted", date: "Oct 24, 2024", icon: CheckCircle2, color: "text-emerald-400", active: true },
    { label: "AI Verification", date: "Oct 25, 2024", icon: CheckCircle2, color: "text-emerald-400", active: true },
    { label: "Department Review", date: "Processing...", icon: Clock, color: "text-yellow-400", active: true },
    { label: "Resolution", date: "Pending", icon: AlertCircle, color: "text-slate-500", active: false },
  ];

  const handleTrack = () => {
    if (!trackingId) return;
    setIsTracking(true);
    setTimeout(() => {
      setActiveCase(trackingId.toUpperCase());
      setIsTracking(false);
      setTrackingId('');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Transparency <span className="gradient-text">Tracker</span></h1>
        <p className="text-slate-300 text-sm mt-1">Real-time status of your complaints and fund applications</p>
      </div>

      {/* ── SECTION: Two-Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN — 2/3 width */}
        <div className="lg:col-span-2 space-y-6">

          {/* Active Case Tracker Card */}
          <div className="glass-card p-6 border-t-2 border-sky-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-1">Active Case</p>
                <h3 className="text-xl font-bold text-white">{activeCase}</h3>
              </div>
              <div className="flex gap-2">
                <div className="px-4 py-2 bg-[#0f2244] border border-[#1e3a6e] rounded-xl flex items-center gap-2">
                  <Search size={14} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Track another ID..."
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                    className="bg-transparent border-none text-sm text-white focus:outline-none w-32 md:w-48"
                  />
                </div>
                <button onClick={handleTrack} className="btn-primary py-2 text-xs flex items-center gap-2">
                  {isTracking ? <Loader2 size={14} className="animate-spin" /> : null}
                  Track
                </button>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-[#1e3a6e] hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {statusSteps.map((step, i) => (
                  <div key={i} className="text-center space-y-3">
                    <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border-2 z-10 relative ${
                      step.active ? 'bg-[#0b1628] border-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.3)]' : 'bg-[#0f2244] border-[#1e3a6e]'
                    }`}>
                      <step.icon size={18} className={step.color} />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${step.active ? 'text-white' : 'text-slate-500'}`}>{step.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fund Allocation Section */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-sky-400" />
              Fund Allocation Journey
            </h3>
            <div className="space-y-4">
              {[
                { title: "Ministry Approval", desc: "Central fund disbursed to State level", amount: "₹45,00,000" },
                { title: "District Distribution", desc: "Allocated to Regional Welfare Board", amount: "₹12,50,000" },
                { title: "Beneficiary Ready", desc: "Final verification in progress", amount: "₹15,000" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0f2244] rounded-xl border border-[#1e3a6e]">
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-sky-400">{item.amount}</p>
                    <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-tighter">Verified</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — 1/3 width */}
        <div className="space-y-6">

          {/* Need Help Card */}
          <div className="glass-card p-6 bg-gradient-to-br from-sky-500/5 to-transparent">
            <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
            <p className="text-sm text-slate-300 mb-4">Our AI concierge is available 24/7 to answer questions about your case status.</p>
            <div className="space-y-3">
              {[
                'How to appeal a decision?',
                'Missing documents notification',
                'Check escalation status',
              ].map((q) => (
                <button key={q} className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-left group">
                  <span className="text-sm text-slate-200">{q}</span>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Case Summary Card */}
          <div className="glass-card p-5 border border-sky-500/20">
            <h3 className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Info size={14} /> Case Summary
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Case ID', value: activeCase },
                { label: 'Filed On', value: 'Oct 24, 2024' },
                { label: 'Category', value: 'Public Welfare' },
                { label: 'Priority', value: 'High' },
              ].map((r) => (
                <div key={r.label} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">{r.label}</span>
                  <span className="text-white font-semibold">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="glass-card p-5 border-t border-sky-500/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <FileText size={14} className="text-sky-400" />
            <span>All data is immutably recorded on the <span className="text-sky-400 font-semibold">SentinelX Blockchain Ledger</span>.</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
            <Phone size={13} className="text-sky-400" />
            <span>Helpline: <span className="text-white font-semibold">1800-GOV-TRUST</span></span>
          </div>
          <div className="flex items-center justify-end gap-2 text-slate-400 text-xs">
            <Mail size={13} className="text-sky-400" />
            <span>support@<span className="text-white font-semibold">sentinelx.gov</span></span>
          </div>
        </div>
        <p className="text-center text-slate-600 text-[10px] mt-3 uppercase tracking-widest">
          © 2024 SentinelX SecureChain GovTrust — Sovereign Digital Infrastructure
        </p>
      </footer>

    </div>
  );
}
