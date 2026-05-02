'use client';
import { useState } from 'react';
import { UserCheck, Activity, BrainCircuit } from 'lucide-react';

export default function Verification() {
  const [formData, setFormData] = useState({ userId: '', income: '', location: '', freq: '' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/verification/verify-user', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(formData.userId) || Math.floor(Math.random() * 1000),
          income: parseFloat(formData.income), location: formData.location,
          transaction_frequency: parseInt(formData.freq)
        })
      });
      setResult(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Neural <span className="gradient-text">Trust</span></h1>
        <p className="text-slate-300 text-sm mt-1">Multi-vector identity verification profiling</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="glass-card p-6 border-t-2 border-sky-500 space-y-5">
            <h3 className="text-base font-bold text-white">Verify Identity</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'userId', label: 'Beneficiary ID', placeholder: 'ID-8829', type: 'text' },
                { id: 'income', label: 'Annual Revenue', placeholder: '50000', type: 'number' },
                { id: 'location', label: 'Region', placeholder: 'Metropolis', type: 'text' },
                { id: 'freq', label: 'Activity Freq', placeholder: '12', type: 'number' },
              ].map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">{field.label}</label>
                  <input required type={field.type} placeholder={field.placeholder}
                    className="w-full bg-[#0f2244] border border-[#2a4a6e] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400 transition-all placeholder:text-slate-500"
                    value={(formData as any)[field.id]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} />
                </div>
              ))}
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center items-center gap-2">
              {loading ? <Activity className="animate-spin" size={15} /> : <UserCheck size={15} />}
              <span>{loading ? 'Analyzing...' : 'Run Verification'}</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <div className="glass-card p-6 flex flex-col items-center text-center space-y-5 border-t-2 border-yellow-500">
              <h3 className="text-base font-bold text-white w-full text-left">Audit Result</h3>
              <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center font-black border-4 bg-[#0f2244] ${
                result.risk_level === 'HIGH' ? 'border-red-400/60 text-red-400' :
                result.risk_level === 'MEDIUM' ? 'border-yellow-400/60 text-yellow-400' :
                'border-emerald-400/60 text-emerald-400'
              }`}>
                <span className="text-3xl">{result.risk_score.toFixed(0)}</span>
                <span className="text-xs text-slate-400 font-bold">Risk</span>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Assessment</p>
                <p className={`text-xl font-black mt-1 ${
                  result.risk_level === 'HIGH' ? 'text-red-400' :
                  result.risk_level === 'MEDIUM' ? 'text-yellow-400' : 'text-emerald-400'
                }`}>{result.risk_level}</p>
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#0f2244] border border-[#2a4a6e] rounded-xl text-left">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Trust Rating</p>
                  <p className="text-lg font-black text-white">{result.trust_score.toFixed(1)}%</p>
                </div>
                <div className="p-3.5 bg-[#0f2244] border border-[#2a4a6e] rounded-xl text-left">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Liveness</p>
                  <p className={`text-lg font-black ${result.is_flagged ? 'text-red-400' : 'text-emerald-400'}`}>
                    {result.is_flagged ? 'FAIL' : 'PASS'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[280px] border-2 border-dashed border-[#2a4a6e]">
              <BrainCircuit size={36} className="text-sky-400/40" />
              <div>
                <p className="text-sm font-bold text-slate-300">Ready to Verify</p>
                <p className="text-xs text-slate-400 mt-1">Fill in the form and run verification</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
