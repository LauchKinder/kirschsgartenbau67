import React from 'react';
import { Coins, GraduationCap, HandHeart } from 'lucide-react';

const WorkMethod: React.FC = () => {
  const steps = [
    {
      icon: GraduationCap,
      title: "Lernprozess",
      desc: "Wir wollen unser Handwerk perfektionieren. Mit jedem Auftrag gewinnen wir an Erfahrung und Präzision."
    },
    {
      icon: HandHeart,
      title: "Spendenbasiert",
      desc: "Fairness steht bei uns an erster Stelle. Sie entscheiden über die Vergütung unserer Arbeit."
    },
    {
      icon: Coins,
      title: "Kein Preisdruck",
      desc: "Wir arbeiten ohne starre Stundensätze. Was Ihnen unsere Arbeit wert ist, bestimmen Sie selbst."
    }
  ];

  return (
    <section id="unser-konzept" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-green-700 text-sm font-bold tracking-widest uppercase mb-3">Unser Konzept</h2>
          <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Wieso wir das tun</p>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-slate-50 p-10 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full text-green-700 mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkMethod;