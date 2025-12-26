import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from './types';

const GardenAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Guten Tag! Ich bin der KI-Assistent von Kirschs Gartenbau. Wie kann ich Ihnen helfen?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    const newMsgs: ChatMessage[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMsgs);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      let fullText = '';
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value);
          setMessages(prev => {
            const up = [...prev];
            up[up.length - 1].text = fullText;
            return up;
          });
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Fehler bei der Verbindung.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-3xl shadow-2xl w-[350px] md:w-[400px] h-[500px] flex flex-col overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2"><Bot className="text-green-400" /> <span className="font-bold">Garten AI</span></div>
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${m.role === 'user' ? 'bg-green-700 text-white' : 'bg-white shadow-sm text-slate-800'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-grow p-2 bg-slate-100 rounded-xl outline-none" placeholder="Frage stellen..." />
            <button onClick={handleSend} className="p-2 bg-slate-900 text-white rounded-xl"><Send size={18} /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-slate-900 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition-all"><MessageSquare /></button>
      )}
    </div>
  );
};
export default GardenAI;