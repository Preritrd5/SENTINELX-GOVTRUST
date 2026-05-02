'use client';
import { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export default function FraudMonitoring() {
  const [flaggedUsers, setFlaggedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFraudData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/fraud/detect-fraud');
      const data = await res.json();
      setFlaggedUsers(data.flagged_users || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFraudData(); }, []);

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Fraud <span className="gradient-text">Monitoring</span></h1>
          <p className="text-slate-300 text-sm mt-1">Real-time heuristics and duplicate detection</p>
        </div>
        <button onClick={fetchFraudData}
          className="flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200 px-4 py-2 rounded-xl border border-sky-500/40 bg-sky-500/10 transition-all">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#2a4a6e] flex items-center gap-2.5 bg-[#0f2244]">
          <ShieldAlert size={15} className="text-sky-400" />
          <span className="text-sm font-bold text-white">Active Threat Watch</span>
          {!loading && <span className="ml-auto text-sm text-slate-300">{flaggedUsers.length} flagged</span>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#2a4a6e] bg-[#0f2244]">
                {['ID', 'Entity', 'Risk Level', 'Reason', 'Action'].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-bold text-slate-300 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a5e]">
              {loading ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-300 text-sm animate-pulse">Syncing with Fraud Engine...</td></tr>
              ) : flaggedUsers.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-sky-300 text-sm">No active threats detected.</td></tr>
              ) : (
                flaggedUsers.map((user, idx) => (
                  <tr key={idx} className="hover:bg-[#0f2244] transition-all">
                    <td className="px-5 py-3.5 text-slate-300 font-mono text-sm">#{user.user_id}</td>
                    <td className="px-5 py-3.5">
                      <div className="text-sm font-semibold text-white">{user.username}</div>
                      <div className="text-xs text-slate-400">Citizen</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 bg-red-500/15 text-red-300 rounded-lg border border-red-500/30 text-xs font-bold">
                        {user.risk_score.toFixed(1)} HIGH
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 text-sm max-w-xs truncate">{user.reason}</td>
                    <td className="px-5 py-3.5">
                      <button className="text-sky-300 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
                        <ShieldAlert size={13} /> Resolve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
