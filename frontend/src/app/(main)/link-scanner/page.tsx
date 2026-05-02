'use client';
import { useState } from 'react';
import { Search, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function LinkScanner() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/link/scan-link', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      setResult(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 bg-sky-500/15 border border-sky-500/40 rounded-xl flex items-center justify-center text-sky-400 shrink-0">
          <Search size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Fraud <span className="gradient-text">Link Scanner</span></h1>
          <p className="text-slate-300 text-sm mt-1">AI-powered phishing and scam URL detection</p>
        </div>
      </div>

      <form onSubmit={handleScan} className="glass-card p-5 flex gap-3">
        <input type="url" required placeholder="https://example.com/verify-account"
          className="flex-1 bg-[#0f2244] border border-[#2a4a6e] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-sky-400 transition-all placeholder:text-slate-500"
          value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit" disabled={loading} className="btn-primary shrink-0">
          {loading ? 'Scanning...' : 'Scan URL'}
        </button>
      </form>

      {result && (
        <div className={`glass-card p-5 border-l-4 ${
          result.status === 'SAFE' ? 'border-emerald-400' :
          result.status === 'FRAUD' ? 'border-red-400' : 'border-yellow-400'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl shrink-0 ${
              result.status === 'SAFE' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
              result.status === 'FRAUD' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
              'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30'
            }`}>
              {result.status === 'SAFE' ? <ShieldCheck size={20} /> :
               result.status === 'FRAUD' ? <ShieldAlert size={20} /> : <AlertTriangle size={20} />}
            </div>
            <div className="flex-1 space-y-3 min-w-0">
              <h3 className={`text-base font-bold ${
                result.status === 'SAFE' ? 'text-emerald-300' :
                result.status === 'FRAUD' ? 'text-red-300' : 'text-yellow-300'
              }`}>{result.status} — Link Detected</h3>
              <p className="text-sm text-slate-300 bg-[#0f2244] px-3 py-2 rounded-lg font-mono break-all border border-[#2a4a6e]">
                {result.url}
              </p>
              <div className="pt-3 border-t border-[#2a4a6e]">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white">AI Analysis: </strong>{result.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
