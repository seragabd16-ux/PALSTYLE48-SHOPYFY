
import React from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-24 pb-12 relative overflow-hidden z-10">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Column 1: Brand & Manifesto (Span 4) */}
          <div className="md:col-span-4 space-y-8">
            <Logo className="h-8" />
            <p className="text-neutral-500 text-sm leading-relaxed font-light max-w-sm">
              Forged in the shadows. Woven with resilience. 
              Palstyle48 is not just a brand; it is a digital archive of heritage 
              and resistance. Every thread carries a story of survival.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black transition-all"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Column 2: Sectors (Span 2) */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs">Sectors</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link to="/category/Hoodies" className="hover:text-red-500 transition-colors">Hoodies</Link></li>
              <li><Link to="/category/T-Shirts" className="hover:text-red-500 transition-colors">T-Shirts</Link></li>
              <li><Link to="/category/Kufiya" className="hover:text-red-500 transition-colors">Kufiya</Link></li>
              <li><Link to="/handmade" className="hover:text-red-500 transition-colors">Handmade</Link></li>
              <li><Link to="/custom-print" className="text-white font-bold hover:text-red-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span> Custom Studio</Link></li>
            </ul>
          </div>

          {/* Column 3: Protocol (Span 2) */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs">Protocol</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link to="/about" className="hover:text-white transition-colors">Manifesto</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Ops</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Staff Access</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Origin (Span 4) */}
          <div className="md:col-span-4 space-y-6 bg-neutral-900/30 p-8 rounded-lg border border-white/5">
             <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs">Origin Transmission</h4>
             <div className="space-y-4">
                <div className="flex items-start gap-4 text-neutral-400 text-sm">
                   <MapPin className="shrink-0 text-red-600" size={18} />
                   <span>Gaza Strip, Palestine<br/>Operating under restrictions.</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-400 text-sm">
                   <Mail className="shrink-0 text-red-600" size={18} />
                   <span>contact@palstyle48.com</span>
                </div>
             </div>
             
             <div className="pt-6 border-t border-white/5 mt-6">
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">Designed & Engineered by</p>
                <h5 className="text-xl font-black text-white tracking-tighter uppercase">Gaza Youth Collective</h5>
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-neutral-600 uppercase tracking-widest font-mono">
           <p>© 2024 Palstyle48. All rights reserved.</p>
           <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
