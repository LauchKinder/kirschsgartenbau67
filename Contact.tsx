import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { SERVICES } from './constants';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: SERVICES[0]?.title || 'Allgemeine Beratung',
    message: ''
  });

  const FORMSPREE_ID = "xjgvbpay"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: SERVICES[0]?.title || 'Allgemeine Beratung', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="kontakt" className="py-24 bg-slate-900 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="text-green-400 text-sm font-bold tracking-widest uppercase mb-3 text-white">Kontakt</h2>
            <h3 className="text-4xl font-bold mb-8 font-serif">Ihr Projekt in der Region.</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/10">
                <div className="p-3 bg-green-500/20 rounded-xl text-green-400"><Phone /></div>
                <div><p className="text-xs text-slate-400 uppercase">Telefon</p><p className="font-bold">+49 (0) 123 456789</p></div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/10">
                <div className="p-3 bg-green-500/20 rounded-xl text-green-400"><Mail /></div>
                <div><p className="text-xs text-slate-400 uppercase">E-Mail</p><p className="font-bold text-sm">info@kirschs-gartenbau.de</p></div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/10">
                <div className="p-3 bg-green-500/20 rounded-xl text-green-400"><MapPin /></div>
                <div><p className="text-xs text-slate-400 uppercase">Gebiet</p><p className="font-bold">76456 Kuppenheim & Umkreis</p></div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            {status === 'success' ? (
              <div className="bg-white p-12 rounded-[3rem] text-slate-900 text-center border-8 border-green-50">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4 font-serif">Vielen Dank!</h3>
                <p className="text-slate-600 mb-8">Wir haben Ihre Anfrage erhalten und melden uns zeitnah zurück.</p>
                <button onClick={() => setStatus('idle')} className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold">Neue Nachricht</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] text-slate-900 shadow-2xl space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Name" required className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-green-600" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input type="email" placeholder="E-Mail" required className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-green-600" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <select className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                  {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
                <textarea placeholder="Nachricht" rows={4} required className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" disabled={status === 'submitting'} className="w-full bg-green-700 text-white py-5 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-green-800 disabled:opacity-50">
                  {status === 'submitting' ? <Loader2 className="animate-spin" /> : <>Anfrage senden <Send size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;