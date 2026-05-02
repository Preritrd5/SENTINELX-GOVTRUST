'use client';
import { useState } from 'react';
import { BrainCircuit, Send, User, Bot } from 'lucide-react';

export default function AIInsights() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am SentinelX AI. Ask me to explain a fraud decision, analyze a link, or summarize threat intelligence.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/ai/ai-explain', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query_type: 'general', context_data: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: `${data.explanation}\n\nRecommendation: ${data.recommendation}` }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, disconnected from LLM engine.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-90px)] flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <BrainCircuit size={22} className="text-sky-400" /> AI <span className="gradient-text">Intelligence Core</span>
        </h1>
        <p className="text-slate-300 text-sm mt-1">LLM-driven threat analysis and protocol advisory</p>
      </div>

      <div className="flex-1 glass-card flex flex-col overflow-hidden border-t-2 border-sky-500">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-sky-600 border-sky-400/40' : 'bg-[#0f2244] border-[#2a4a6e]'}`}>
                {msg.role === 'user' ? <User size={15} className="text-white" /> : <Bot size={15} className="text-sky-400" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-sky-600/25 text-white border border-sky-400/30 rounded-tr-none'
                  : 'bg-[#0f2244] border border-[#2a4a6e] text-slate-200 rounded-tl-none whitespace-pre-line'
              }`}>{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0f2244] border border-[#2a4a6e] flex items-center justify-center">
                <Bot size={15} className="text-sky-400 animate-pulse" />
              </div>
              <div className="bg-[#0f2244] border border-[#2a4a6e] rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:100ms]" />
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:200ms]" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-[#2a4a6e] bg-[#0f2244]">
          <form onSubmit={handleSend} className="relative">
            <input type="text" placeholder="Ask the intelligence engine..."
              className="w-full bg-[#1a2f4e] border border-[#2a4a6e] rounded-xl py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-sky-400 placeholder:text-slate-500 transition-all"
              value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" disabled={loading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 w-9 bg-sky-600 hover:bg-sky-500 text-white rounded-lg flex items-center justify-center transition-all disabled:opacity-40">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
