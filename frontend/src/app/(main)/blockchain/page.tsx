'use client';
import { useState, useEffect } from 'react';
import { Database, Link as LinkIcon, CheckCircle2, RefreshCw } from 'lucide-react';

export default function BlockchainViewer() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLedger = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/blockchain/ledger');
      const data = await res.json();
      setTxs(data.events || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchLedger();
    const interval = setInterval(fetchLedger, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Database size={20} className="text-sky-400" />
            Immutable <span className="gradient-text">Ledger</span>
          </h1>
          <p className="text-slate-300 text-sm mt-1">Real-time block validation — Sovereign Transparency</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sm font-bold text-sky-300">Node Sync</span>
          </div>
          <button onClick={fetchLedger} className="w-9 h-9 flex items-center justify-center bg-[#1a2f4e] border border-[#2a4a6e] rounded-xl text-slate-300 hover:text-sky-300 transition-all">
            <RefreshCw size={14} className={loading ? 'animate-spin text-sky-400' : ''} />
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden border-t-2 border-sky-500">
        {loading && txs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14">
            <RefreshCw size={22} className="animate-spin text-sky-400 mb-3" />
            <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Accessing Ledger State...</p>
          </div>
        ) : txs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14">
            <Database size={32} className="text-sky-400/40 mb-3" />
            <p className="text-base font-bold text-white">No Events Recorded</p>
            <p className="text-sm mt-1 text-slate-400">Awaiting system interactions</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0f2244] border-b border-[#2a4a6e]">
                  {['Block', 'From', 'To', 'Amount', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-xs font-bold text-slate-300 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e3a5e]">
                {txs.map((tx: any) => (
                  <tr key={tx.hash} className="hover:bg-[#0f2244] transition-all">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-400 border border-sky-500/30">
                          <LinkIcon size={11} />
                        </div>
                        <span className="text-sky-300 font-mono text-sm font-bold">0X{tx.hash.substring(2, 10).toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-white">{tx.from === '0x0000000000000000000000000000000000000000' ? 'GENESIS' : 'ACTOR'}</div>
                      <div className="text-xs text-slate-400 font-mono">{(tx.from || '').substring(0, 10)}...</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-sky-300">ID_{tx.to.substring(2, 8).toUpperCase()}</div>
                      <div className="text-xs text-slate-400 font-mono">{(tx.to || '').substring(0, 10)}...</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-base font-black text-white">${tx.amount.toLocaleString()}</span>
                      <span className="ml-2 text-xs text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded bg-yellow-500/10 font-bold">USDG</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`status-badge inline-flex items-center gap-1.5 ${tx.status === 'Confirmed' ? 'text-emerald-300 border-emerald-400/40 bg-emerald-500/10' : 'text-sky-300 border-sky-400/40 bg-sky-500/10'}`}>
                        <CheckCircle2 size={11} />
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
