
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, PenTool } from 'lucide-react';

interface Sector {
  id: string;
  en: string;
  ar: string;
  sub: string;
  image: string;
  link: string;
  className: string; // Controls grid span
  icon?: any;
}

const SECTORS: Sector[] = [
  {
    id: '01',
    en: 'HOODIES',
    ar: 'هودي',
    sub: 'WINTER ARMOR',
    // Model shot: Dark, oversized, street lighting
    image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1000&auto=format&fit=crop', 
    link: '/category/Hoodies',
    className: 'md:col-span-2 md:row-span-2'
  },
  {
    id: '02',
    en: 'KUFIYA',
    ar: 'كوفيات',
    sub: 'HERITAGE',
    // Model shot: Authentic styling, scarf focus
    image: 'https://images.unsplash.com/photo-1585257323287-21a473f309a4?q=80&w=1000&auto=format&fit=crop',
    link: '/category/Kufiya',
    className: 'md:col-span-1 md:row-span-2'
  },
  {
    id: '03',
    en: 'T-SHIRTS',
    ar: 'تي شيرت',
    sub: 'SUMMER DRILL',
    // Model shot: Graphic tee, moody
    image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop',
    link: '/category/T-Shirts',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: '04',
    en: 'ACCESSORIES',
    ar: 'اكسسوارات',
    sub: 'ARTIFACTS',
    // Model/Detail shot: Jewelry or detail
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
    link: '/category/Accessories',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: '05',
    en: 'BAGS & GEAR',
    ar: 'شنط وعتاد',
    sub: 'CARGO',
    // Lifestyle shot: Bag in use
    image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=1000&auto=format&fit=crop',
    link: '/category/Bags',
    className: 'md:col-span-2 md:row-span-1 h-64 md:h-80'
  },
  {
    id: '06',
    en: 'CUSTOM STUDIO',
    ar: 'تصميم خاص',
    sub: 'CREATE LEGACY',
    // Creative/Design vibe
    image: 'https://images.unsplash.com/photo-1516826957135-b8627bb6f31c?q=80&w=1000&auto=format&fit=crop',
    link: '/custom-print',
    className: 'md:col-span-2 md:row-span-1 h-64 md:h-80',
    icon: PenTool
  }
];

export const SectorGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
         <div>
            <span className="text-red-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-2">Command Center</span>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase">Sector Access</h2>
         </div>
         <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest text-right max-w-xs mt-4 md:mt-0">
            Select a protocol to initialize.<br/>
            Hover to decrypt visual data.
         </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(250px,auto)]">
        {SECTORS.map((sector) => (
          <Link 
            key={sector.id} 
            to={sector.link}
            className={`group relative overflow-hidden bg-neutral-900 border border-white/5 ${sector.className}`}
          >
            {/* The Image Layer */}
            <div className="absolute inset-0 overflow-hidden">
               <motion.img 
                 src={sector.image} 
                 alt={sector.en}
                 loading="lazy"
                 decoding="async"
                 className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] filter grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
               />
               {/* Cinematic Noise & Vignette */}
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
               
               {/* Top: ID & Tactical Marker */}
               <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-black border px-2 py-1 backdrop-blur-md uppercase tracking-widest ${sector.id === '06' ? 'bg-red-600 text-white border-red-500' : 'border-white/20 text-white/80 bg-black/40'}`}>
                    SEC // {sector.id}
                  </span>
                  <div className={`w-12 h-12 rounded-full border backdrop-blur-sm flex items-center justify-center transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ${sector.id === '06' ? 'bg-white text-black border-white' : 'border-white/10 bg-white/5 text-white'}`}>
                     {sector.icon ? <sector.icon size={20} /> : <ArrowUpRight size={20} />}
                  </div>
               </div>

               {/* Bottom: Titles & Animation */}
               <div className="relative">
                  
                  {/* English Title - Reverted to Original Solid Style */}
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none group-hover:scale-105 transition-transform duration-500 origin-bottom-left">
                    {sector.en}
                  </h3>
                  
                  {/* Arabic Title - Lifted Higher (-mt-6) */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/50 uppercase tracking-tighter -mt-6 group-hover:text-white transition-colors duration-500 leading-none">
                    {sector.ar}
                  </h3>

                  {/* Decorative Line */}
                  <div className="mt-6 h-[1px] w-full bg-white/10 relative overflow-hidden">
                     <div className="absolute inset-0 bg-red-600 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                  </div>

                  {/* Subtitle */}
                  <div className="flex items-center gap-2 mt-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${sector.id === '06' ? 'bg-white' : 'bg-red-600'}`}></span>
                    <p className="text-[9px] font-mono text-neutral-300 tracking-[0.2em] uppercase">
                        {sector.sub} Protocol
                    </p>
                  </div>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
