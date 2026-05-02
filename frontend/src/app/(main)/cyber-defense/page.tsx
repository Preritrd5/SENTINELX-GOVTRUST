'use client';
import { useState, useEffect } from 'react';
import { ShieldHalf, Bug, Terminal, Activity, ShieldCheck as ShieldCheckIcon } from 'lucide-react';

export default function CyberDefense() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('SECURE');

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/fuzz/cyber-logs');
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error('Failed to fetch cyber logs:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const runAttackSimulation = async () => {
    setLoading(true);
    setStatus('ATTACKING');
    try {
      await fetch('http://127.0.0.1:8000/api/fuzz/run-fuzz', { method: 'POST' });
      await new Promise(r => setTimeout(r, 2000));
      await fetchLogs();
      setStatus('SECURE');
    } catch (err) {
      console.error(err);
      setStatus('ERROR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <ShieldHalf className="text-blue-400" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Neural <span className="gradient-text">Defense Hub</span></h1>
            <p className="text-slate-400 text-sm mt-0.5">Autonomous Self-Healing System & Fuzz Testing Engine</p>
          </div>
        </div>
        <button
          onClick={runAttackSimulation}
          disabled={loading}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-600/20 active:scale-95 disabled:opacity-50"
        >
          {loading ? <Activity className="animate-spin" size={16} /> : <Bug size={16} />}
          <span>Initiate Cyber Siege</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left panel */}
        <div className="lg:col-span-4 space-y-4">
          {/* Status card */}
          <div className="glass-card p-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">System Health Pulse</p>
            <div className="space-y-3">
              {/* Status indicator */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="relative shrink-0">
                  <div className={`w-4 h-4 rounded-full ${status === 'ATTACKING' ? 'bg-yellow-500 animate-ping' : status === 'SECURE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <div className={`absolute inset-0 w-4 h-4 rounded-full ${status === 'ATTACKING' ? 'bg-yellow-500' : status === 'SECURE' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-red-500'}`} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Environment Status</p>
                  <p className={`text-lg font-black tracking-tight mt-0.5 ${status === 'SECURE' ? 'text-emerald-400' : status === 'ATTACKING' ? 'text-yellow-400' : 'text-red-400'}`}>{status}</p>
                </div>
              </div>

              {/* Sub-systems */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Defense Sub-Systems</p>
                <ul className="space-y-2.5">
                  {['Fuzzing Grid: ACTIVE', 'Neural Firewall: ARMED', 'Anti-Exploit: RUNNING'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <ShieldCheckIcon size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mitigations */}
          <div className="glass-card p-5 border-t-2 border-blue-500">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Mitigations</p>
            <p className="text-5xl font-black text-white tracking-tight">{logs.length}</p>
            <p className="text-slate-400 text-sm mt-2">Threat neutralizations in current monitoring window.</p>
          </div>
        </div>

        {/* Live feed */}
        <div className="lg:col-span-8 glass-card overflow-hidden flex flex-col" style={{ height: '520px' }}>
          {/* Terminal header */}
          <div className="bg-white/5 px-5 py-3 border-b border-white/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a1628] border border-white/10 flex items-center justify-center">
                <Terminal size={15} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Live Audit Feed</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Stream: Gov_Defense_v4.2</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
          </div>

          {/* Log entries */}
          <div className="flex-1 overflow-y-auto p-5 bg-[#071020]/60 font-mono text-sm space-y-5">
            {logs.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-slate-500 text-sm uppercase tracking-widest animate-pulse">Initializing neural monitors...</p>
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={log.id || idx} className="relative pl-6 py-1 border-l-2 border-white/10 hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-slate-500 text-xs">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      log.event_type === 'ATTACK'
                        ? 'bg-red-500/15 border-red-500/30 text-red-400'
                        : 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                    }`}>
                      {log.event_type}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    <span className="text-slate-500 text-xs uppercase tracking-wider mr-2">Endpoint:</span>
                    <span className="text-blue-300 font-bold">{log.endpoint}</span>
                  </p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{log.details}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,1)]" />
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{log.action_taken}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
