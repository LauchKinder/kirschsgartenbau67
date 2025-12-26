import React from 'react';
import { SERVICES, ICON_MAP } from './constants';

const Services: React.FC = () => {
  return (
    <section id="leistungen" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-green-700 text-sm font-bold tracking-widest uppercase mb-3">Was wir tun</h2>
          <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Unsere Dienstleistungen</p>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.icon];
            return (
              <div key={service.id} className="group relative bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-xl text-green-700 mb-4">
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;