'use client';
import { Type, Image as ImageIcon, Mic, Link as LinkIcon, ArrowRight } from 'lucide-react';

export function InputModes() {
  const modes = [
    { label: "Text", icon: Type, color: "text-sky-400", bg: "bg-sky-500/10" },
    { label: "Image", icon: ImageIcon, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Voice", icon: Mic, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Link / URL Submission", icon: LinkIcon, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  ];

  return (
    <div className="glass-card p-6 border-t-2 border-sky-400/30">
      <h3 className="text-[10px] font-bold text-sky-400/50 uppercase tracking-[0.2em] mb-4 text-center">Input Modes</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {modes.map((mode, i) => (
          <button key={i} 
            onClick={() => alert(`${mode.label} ingestion mode activated. Neural Engine listening...`)}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-white/10 transition-all group">
            <div className={`p-3 rounded-xl ${mode.bg} ${mode.color} group-hover:scale-110 transition-transform`}>
              <mode.icon size={20} />
            </div>
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tighter text-center leading-tight">
              {mode.label}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-[#0f2244] border border-[#1e3a6e] rounded-xl flex items-center justify-between group cursor-pointer hover:border-sky-500/40 transition-all"
        onClick={() => alert("Connecting to SentinelX Neural Backbone...")}>        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <p className="text-sm text-slate-300">Neural Engine ready for ingestion...</p>
        </div>
        <ArrowRight size={16} className="text-slate-500 group-hover:text-sky-400 transition-all" />
      </div>
    </div>
  );
}
