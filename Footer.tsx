import React from 'react';
import { Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-white">
          <Leaf className="text-green-500" /> <span className="font-bold">KIRSCHS GARTENBAU</span>
        </div>
        <div className="text-sm">© {new Date().getFullYear()} Kirschs Gartenbau | Kuppenheim</div>
      </div>
    </footer>
  );
};
export default Footer;