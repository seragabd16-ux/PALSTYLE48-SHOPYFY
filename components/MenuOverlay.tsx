
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Instagram, Facebook, Twitter, Check, Moon, Sun, Globe, MessageCircle, PenTool, Sparkles } from 'lucide-react';

export const MenuOverlay: React.FC = () => {
  const { isMenuOpen, toggleMenu, language, setLanguage, isDarkMode, toggleTheme, currency, setCurrency } = useStore();

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'TRY', symbol: '₺' },
    { code: 'ILS', symbol: '₪' },
  ];

  const links = [
    { name: 'HOME', path: '/' },
    { name: 'HOODIES', path: '/category/Hoodies' },
    { name: 'SUMMER', path: '/category/Summer' },
    { name: 'SPORT', path: '/category/Sport' },
    { name: 'ACCESSORIES', path: '/category/Accessories' },
    { name: 'KUFIYA', path: '/category/Kufiya' },
    { name: 'HANDMADE', path: '/handmade' },
    { name: 'SPECIAL DESIGNS', path: '/special-designs', highlight: true },
    { name: 'CUSTOM STUDIO', path: '/custom-print', special: true },
    { name: 'OUR STORY', path: '/about' },
  ];

  const menuVariants: Variants = {
    closed: { 
      y: '-100%', 
      opacity: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    },
    open: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-40 bg-white/98 dark:bg-black/98 backdrop-blur-2xl flex flex-col overflow-hidden transition-colors duration-500"
        >
          {/* --- ATMOSPHERIC LAYERS --- */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             
             {/* 1. Cinematic Grain */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10" />

             {/* 2. Moiré Layer A (Base) - Breathing Out */}
             <motion.div 
               className="absolute inset-[-25%] w-[150%] h-[150%] opacity-[0.03] dark:opacity-[0.05] text-black dark:text-white"
               animate={{ 
                 rotate: [0, 5, 0],
                 scale: [1, 1.05, 1],
                 x: ["0%", "2%", "0%"]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
             >
                <svg width="100%" height="100%">
                  <pattern id="kufiyaBase" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M0 30 L30 0 L60 30 L30 60 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    <rect x="28" y="28" width="4" height="4" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#kufiyaBase)" />
                </svg>
             </motion.div>

             {/* 3. Moiré Layer B (Interference) - Breathing In (Opposing Motion) */}
             <motion.div 
               className="absolute inset-[-25%] w-[150%] h-[150%] opacity-[0.03] dark:opacity-[0.05] text-red-600 dark:text-red-500 mix-blend-multiply dark:mix-blend-screen"
               animate={{ 
                 rotate: [0, -5, 0],
                 scale: [1.05, 1, 1.05],
                 x: ["0%", "-2%", "0%"]
               }}
               transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
             >
                <svg width="100%" height="100%">
                   <pattern id="kufiyaInterference" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M30 0 V60 M0 30 H60" stroke="currentColor" strokeWidth="0.5" />
                   </pattern>
                   <rect width="100%" height="100%" fill="url(#kufiyaInterference)" />
                </svg>
             </motion.div>

             {/* 4. Radial Vignette */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
          </div>

          <div className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 pt-32 pb-12 relative z-20">
            
            {/* Top Bar: Currency & Settings */}
            <div className="flex justify-between items-start mb-12 border-b border-neutral-200 dark:border-white/10 pb-8">
               {/* Currency Selector */}
               <div className="space-y-2">
                  <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-bold uppercase">Currency</span>
                  <div className="flex gap-2">
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setCurrency(c.code as any)}
                        className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-2 transition-all ${
                          currency === c.code 
                            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' 
                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-black dark:hover:border-white'
                        }`}
                      >
                        {c.code}
                        {currency === c.code && <Check size={10} />}
                      </button>
                    ))}
                  </div>
               </div>

               {/* Theme & Language */}
               <div className="flex items-center gap-4">
                  <button onClick={toggleTheme} className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                     {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                  <div className="bg-neutral-100 dark:bg-neutral-900 rounded-full p-1 flex">
                     {['en', 'tr', 'ar'].map(lang => (
                       <button 
                         key={lang}
                         onClick={() => setLanguage(lang as any)}
                         className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                           language === lang ? 'bg-white dark:bg-black shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                         }`}
                       >
                         {lang}
                       </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Main Navigation with Parallax */}
            <div className="flex-1 flex flex-col justify-center gap-2">
              {links.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="group relative"
                >
                  <Link 
                    to={link.path}
                    onClick={toggleMenu}
                    className={`text-4xl md:text-6xl font-black tracking-tighter hover:text-red-600 dark:hover:text-red-500 transition-all duration-300 flex items-center gap-4 group-hover:translate-x-4 group-hover:scale-105 origin-left ${
                        link.special ? 'text-red-600 dark:text-red-500' : 
                        link.highlight ? 'text-neutral-400 dark:text-neutral-400 italic' : 
                        'text-black dark:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    
                    {/* Ghost Text Effect */}
                    <span className="absolute left-0 top-0 opacity-0 group-hover:opacity-10 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-transparent transform translate-x-2 translate-y-2 pointer-events-none transition-opacity duration-300" style={{ WebkitTextStroke: '1px currentColor' }}>
                       {link.name}
                    </span>

                    {link.special && <PenTool size={32} strokeWidth={2.5} className="animate-pulse" />}
                    {link.highlight && <Sparkles size={24} strokeWidth={2} className="text-yellow-500 animate-spin-slow" />}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom: Socials & Info */}
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex gap-6">
                  <a href="https://instagram.com" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors transform hover:scale-110"><Instagram /></a>
                  <a href="https://facebook.com" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors transform hover:scale-110"><Facebook /></a>
                  <a href="https://tiktok.com" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors transform hover:scale-110"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.5 5.5v10.5a3 3 0 1 1-3-3v-3a6 6 0 1 0 6 6v-6.5h2a6 6 0 0 0 6-6h-3a3 3 0 0 1-3 3h-5z"/></svg></a>
                  <a href="https://wa.me/" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors transform hover:scale-110"><MessageCircle /></a>
               </div>
               <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                 Made in Gaza. Shipped Worldwide.
               </p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
