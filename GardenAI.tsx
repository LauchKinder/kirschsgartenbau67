import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from './types';

const GardenAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Guten Tag! Ich bin der KI-Assistent von Kirschs Gartenbau. Wie kann ich Ihnen heute bei Ihrem Gartenprojekt helfen?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    setError(null);
    const userMsg = input.trim();
    setInput('');
    const newMsgs: ChatMessage[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMsgs);
    setIsLoading(true);

    try {
      // WICHTIG: Absoluter Pfad für Vercel API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server meldet Status ${res.status}`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      let fullText = '';
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          fullText += decoder.decode(value, { stream: true });
          setMessages(prev => {
            const up = [...prev];
            up[up.length - 1].text = fullText;
            return up;
          });
        }
      }
    } catch (e: any) {
      console.error("Chat Error:", e);
      setError(e.message);
      setMessages(prev => [...prev, { role: 'model', text: 'Verbindung fehlgeschlagen. Bitte prüfen Sie, ob der API_KEY in Vercel hinterlegt ist.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-[350px] md:w-[400px] h-[550px] flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Bot className="text-green-400 h-5 w-5" />
              </div>
              <div>
                <span className="font-bold block text-sm">Garten-Assistent</span>
                <span className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-green-700 text-white shadow-md rounded-tr-none' 
                    : 'bg-white shadow-sm border border-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  {m.text || (isLoading && i === messages.length - 1 ? <Loader2 className="animate-spin h-4 w-4" /> : null)}
                </div>
              </div>
            ))}
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] flex items-center gap-2 border border-red-100">
                <AlertCircle size={14} /> {error}
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200 focus-within:border-green-500 transition-all">
              <input 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()} 
                className="flex-grow p-2 bg-transparent outline-none text-sm px-3" 
                placeholder="Wie kann ich helfen?" 
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all active:scale-95"
              >
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send size={18} />}
              </button>
            </div>
            <p className="text-[9px] text-center text-slate-400 mt-3 flex items-center justify-center gap-1 uppercase tracking-wider font-bold">
              <Sparkles size={10} /> Kirschs Gartenbau AI
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:bg-green-700 hover:scale-110 transition-all group relative"
        >
          <MessageSquare className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
        </button>
      )}
    </div>
  );
};
export default GardenAI;
