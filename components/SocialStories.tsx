
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Radio } from 'lucide-react';

export const SocialStories: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // High-res placeholder visuals for a "Dark Fashion" feed
  const stories = [
    { id: 1, user: '@PAL.STYLE', img: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, user: '@GAZA.DREAM', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, user: '@RESIST.ART', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, user: '@FREEDOM', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, user: '@NIGHT.SHIFT', img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, user: '@SILENCE', img: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1000&auto=format&fit=crop' },
    { id: 7, user: '@VOID.WALKER', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop' },
  ];

  return (
    <section className="py-24 bg-black border-y border-neutral-900 relative z-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </div>
           <h3 className="text-white font-bold text-sm tracking-[0.3em] uppercase">Global Feed • Live</h3>
        </div>
        <a href="https://instagram.com" className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] tracking-widest uppercase">
          <Instagram size={14} /> Join Protocol
        </a>
      </div>

      {/* Cinematic Horizontal Scroll Reel */}
      <div className="flex gap-4 px-6 md:px-12 overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
        {stories.map((story, i) => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0 w-[240px] h-[360px] group overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-white/50 transition-colors duration-500"
          >
            {/* Image Layer */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={story.img} 
                  alt={story.user} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0" 
                />
            </div>

            {/* Glitch Overlay on Hover */}
            <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

            {/* UI Layer */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-transparent via-transparent to-black/90">
               <div className="flex justify-between items-start">
                  <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-sm border border-white/10">
                     <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                  </div>
               </div>
               
               <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] text-neutral-400 font-mono tracking-widest mb-1">SIGNAL_DETECTED</p>
                  <p className="text-white font-bold tracking-wider text-sm">{story.user}</p>
                  
                  <div className="h-[1px] w-0 group-hover:w-full bg-white mt-4 transition-all duration-700 delay-100" />
               </div>
            </div>
          </motion.div>
        ))}
        
        {/* End Card */}
         <div className="relative flex-shrink-0 w-[240px] h-[360px] flex items-center justify-center border border-dashed border-neutral-800 group hover:border-neutral-600 transition-colors cursor-pointer">
            <div className="text-center space-y-4">
               <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto text-neutral-500 group-hover:text-white transition-colors">
                  <Instagram size={20} />
               </div>
               <p className="text-neutral-500 text-xs tracking-widest uppercase group-hover:text-white">View Full Archive</p>
            </div>
         </div>
      </div>
    </section>
  );
};
