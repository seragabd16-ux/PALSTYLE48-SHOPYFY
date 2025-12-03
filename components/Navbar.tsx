
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Sun, Moon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Logo } from './Logo';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { cart, toggleAdmin, isAdmin, toggleMenu, toggleCart, toggleTheme, isDarkMode, isMenuOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-neutral-200 dark:border-white/5 py-4' 
        : 'bg-transparent border-transparent py-6'
      }`}
    >
      {/* Creative Kufiya Overlay - Active on Scroll or Menu Open */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 0.08 : isScrolled ? 0.02 : 0,
          filter: isMenuOpen ? "blur(0px)" : "blur(2px)"
        }}
        transition={{ duration: 0.8 }}
      >
         <motion.div 
           className="w-[150%] h-[200%] absolute -top-1/2 -left-1/4"
           animate={{ 
             y: isMenuOpen ? [-10, 0, -10] : 0,
             rotate: isMenuOpen ? 2 : 0,
             scale: isMenuOpen ? 1.05 : 1
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         >
            <svg width="100%" height="100%">
               <pattern id="navKufiya" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M0 15 L15 0 L30 15 L15 30 Z" fill="none" stroke={isDarkMode ? "white" : "black"} strokeWidth="0.5" />
                  <rect x="14" y="14" width="2" height="2" fill={isDarkMode ? "white" : "black"} />
               </pattern>
               <rect width="100%" height="100%" fill="url(#navKufiya)" />
            </svg>
         </motion.div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between relative z-10">
        
        {/* Left: Menu Trigger */}
        <div className="flex items-center gap-6 flex-1">
          <button 
             onClick={toggleMenu} 
             className={`w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-95 group relative overflow-hidden ${
               isScrolled ? 'hover:bg-neutral-100 dark:hover:bg-white/10' : 'hover:bg-white/10'
             }`}
          >
            <div className="flex flex-col gap-1.5 items-start">
               <span className={`h-[2px] transition-all duration-300 ${isScrolled ? 'bg-black dark:bg-white' : 'bg-white shadow-sm'} w-6 group-hover:w-8 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
               <span className={`h-[2px] transition-all duration-300 delay-75 ${isScrolled ? 'bg-black dark:bg-white' : 'bg-white shadow-sm'} w-4 group-hover:w-8 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
               <span className={`h-[2px] transition-all duration-300 ${isScrolled ? 'bg-black dark:bg-white' : 'bg-white shadow-sm'} w-6 group-hover:w-8 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
          <span className={`hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${
            isScrolled ? 'text-neutral-500 group-hover:text-black dark:group-hover:text-white' : 'text-white/70 group-hover:text-white'
          }`}>Menu</span>
        </div>

        {/* Center: Absolute Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link to="/" className={`block group transition-colors ${isScrolled ? 'text-black dark:text-white' : 'text-white'}`}>
            <Logo className="h-10 group-hover:scale-105 transition-transform duration-500" />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-end">
          
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              isScrolled 
              ? 'text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
             onClick={toggleAdmin} 
             className={`hidden lg:block text-[9px] font-bold tracking-[0.2em] uppercase transition-colors px-4 py-2 border rounded-full ${
                 isAdmin 
                 ? 'text-red-500 border-red-500/20 bg-red-500/5' 
                 : isScrolled 
                    ? 'text-neutral-500 border-transparent hover:border-neutral-200 dark:hover:border-white/20 hover:text-black dark:hover:text-white'
                    : 'text-white/70 border-transparent hover:border-white/30 hover:text-white'
             }`}
          >
            {isAdmin ? 'System Active' : 'Admin'}
          </button>
          
          <Link to="/admin" className={`transition-colors hidden md:block ${
            isScrolled ? 'text-black dark:text-white hover:text-neutral-500' : 'text-white hover:text-white/70'
          }`}>
            <User className="w-5 h-5" />
          </Link>
          
          <button 
             onClick={toggleCart} 
             className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-95 group ${
               isScrolled ? 'hover:bg-neutral-100 dark:hover:bg-white/10' : 'hover:bg-white/10'
             }`}
          >
            <ShoppingBag className={`w-5 h-5 transition-colors ${
              isScrolled 
              ? 'text-black dark:text-white group-hover:text-red-600' 
              : 'text-white group-hover:text-red-500'
            }`} />
            {cart.length > 0 && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
