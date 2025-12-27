import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from './types';

const GardenAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Guten Tag! Ich bin der digitale Assistent von Kirschs Gartenbau. Wie kann ich Ihnen heute bei Ihrem Gartenprojekt helfen?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingBufferRef = useRef<string>('');
  const displayTaskRef = useRef<number | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isThinking]);

  // Cooldown Timer Logic (Internal only)
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  // Helper function for typing effect (Throttled streaming)
  const startTypingEffect = (targetIndex: number) => {
    if (displayTaskRef.current) clearInterval(displayTaskRef.current);
    
    displayTaskRef.current = window.setInterval(() => {
      if (typingBufferRef.current.length > 0) {
        const nextChar = typingBufferRef.current.charAt(0);
        typingBufferRef.current = typingBufferRef.current.substring(1);
        
        setMessages(prev => {
          const updated = [...prev];
          updated[targetIndex].text += nextChar;
          return updated;
        });
      } else if (!isLoading) {
        // Typing finished and no more data coming from stream
        if (displayTaskRef.current) {
          clearInterval(displayTaskRef.current);
          displayTaskRef.current = null;
          // Start the 6s internal cooldown after typing finished
          setCooldown(6);
        }
      }
    }, 35); // 35ms per character for a natural typing flow
  };

  const handleSend = async () => {
    // Check internal cooldown before sending
    if (!input.trim() || isLoading || isThinking || cooldown > 0) return;
    
    setError(null);
    const userMsg = input.trim();
    setInput('');
    const newMsgs: ChatMessage[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMsgs);
    
    // 1. Artificial Thinking Phase (4 seconds)
    setIsThinking(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    setIsThinking(false);
    
    // 2. API Request
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: `Fehler ${res.status}` }));
        throw new Error(errorData.error || "Verbindung unterbrochen");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      
      const targetIdx = newMsgs.length;
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      // Start the display engine (typing effect)
      startTypingEffect(targetIdx);
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          typingBufferRef.current += chunk;
        }
      }
    } catch (e: any) {
      setError(e.message);
      setMessages(prev => [...prev, { role: 'model', text: 'Entschuldigung, ich konnte die Anfrage nicht verarbeiten.' }]);
      setCooldown(6);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] w-[350px] md:w-[420px] h-[600px] flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-slate-900 p-5 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="text-green-400 h-6 w-6" />
                {(isLoading || isThinking) && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </div>
              <div>
                <span className="font-bold block text-sm">Garten-Experte AI</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  {isThinking ? 'Analysiert...' : isLoading ? 'Schreibt...' : 'Online'}
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Content */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-green-700 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-3 text-slate-400 text-xs">
                  <Sparkles className="h-4 w-4 text-green-500 animate-spin" />
                  KI berechnet die beste Antwort für Sie...
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] flex items-center gap-2 border border-red-100">
                <AlertCircle size={14} /> {error}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white border-t border-slate-100">
            <div className={`flex gap-2 p-2 rounded-2xl transition-all ${isThinking || isLoading ? 'bg-slate-50' : 'bg-slate-100 focus-within:ring-2 focus-within:ring-green-600/20 focus-within:bg-white'}`}>
              <input 
                type="text" 
                value={input} 
                disabled={isLoading || isThinking}
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()} 
                className="flex-grow p-2 bg-transparent outline-none text-sm px-3 text-slate-900 disabled:text-slate-400" 
                placeholder={isThinking ? "KI überlegt..." : "Frage stellen..."} 
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || isThinking || cooldown > 0 || !input.trim()} 
                className={`p-3 rounded-xl transition-all flex items-center justify-center min-w-[48px] ${
                  isLoading || isThinking || cooldown > 0
                  ? 'bg-slate-200 text-slate-400' 
                  : 'bg-slate-900 text-white hover:bg-green-700 active:scale-95'
                }`}
                title={cooldown > 0 ? "Einen Moment Geduld..." : "Nachricht senden"}
              >
                {isThinking ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:bg-green-700 hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageSquare className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default GardenAI;
