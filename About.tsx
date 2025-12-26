import React from 'react';
import { CheckCircle2, Heart, MapPin } from 'lucide-react';
import { TEAM } from './constants';

const About: React.FC = () => {
  const points = [
    'Fokus auf Kuppenheim & Baden-Baden',
    'Junges, motiviertes 4er-Team',
    'Spendenbasiertes Modell',
    'Arbeit für echte Erfahrung',
    'Kostenlose Erstberatung vor Ort',
    'Zuverlässige Ausführung'
  ];

  return (
    <section id="ueber-uns" className="py-24 bg-slate-50 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-green-700 text-sm font-bold tracking-widest uppercase mb-3">Wer wir sind</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight font-serif">
              Ihre Gärtner für Kuppenheim und Baden-Baden.
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Wir sind ein lokales Team aus <strong>Kuppenheim</strong>, das Gartenpflege mit Leidenschaft betreibt. Unser Ziel ist es, wertvolle Praxiserfahrung zu sammeln und dabei Ihre grüne Oase zu verschönern.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <span className="text-slate-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-100 p-6 rounded-2xl border border-green-200 mb-10 flex items-start gap-4">
              <Heart className="h-6 w-6 text-green-700 shrink-0 mt-1" />
              <p className="text-green-800 font-medium">
                Als Beginner-Team arbeiten wir spendenbasiert. Sie erhalten volle Qualität und entscheiden selbst über die Höhe des Honorars für unsere Kasse.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="border-l-4 border-green-600 pl-4">
                  <p className="text-lg font-bold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200" alt="Unser Team" className="w-full h-[600px] object-cover" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-3 border border-green-100">
                <MapPin className="h-5 w-5 text-green-700" />
                <span className="font-bold text-slate-900 text-sm">Aktiv in Kuppenheim & Baden-Baden</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;