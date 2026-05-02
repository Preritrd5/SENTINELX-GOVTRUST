'use client';
import { useState } from 'react';
import { FileBadge, Upload, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Certificates() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/api/certificate/verify-certificate', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FileBadge className="text-blue-500" /> Certificate Verification
        </h1>
        <p className="text-slate-400">Verify document authenticity using SHA-256 hashes and Blockchain.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleVerify} className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center space-y-6 min-h-[300px]">
          <div className="w-full relative">
            <input 
              type="file" 
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors bg-slate-900/50">
              <Upload size={40} />
              <p className="text-center font-medium">
                {file ? file.name : "Drag & drop your document here, or click to browse"}
              </p>
            </div>
          </div>
          
          <button type="submit" disabled={loading || !file} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Verifying on Blockchain...' : 'Verify Authenticity'}
          </button>
        </form>

        {result && (
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-center border-2 border-green-500/30 bg-green-500/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-500/20 text-green-400 rounded-full">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-400">{result.status}</h3>
                <p className="text-slate-300">{result.message}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Document SHA-256 Hash</p>
                <div className="bg-slate-950 p-3 rounded-lg border border-white/5 font-mono text-xs text-blue-300 break-all">
                  {result.hash}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Blockchain Transaction ID</p>
                <div className="bg-slate-950 p-3 rounded-lg border border-white/5 font-mono text-xs text-green-300 flex items-center gap-2 break-all">
                  <CheckCircle2 size={14} className="shrink-0" /> {result.tx}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
