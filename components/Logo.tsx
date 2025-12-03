
import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", animated = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      
      {/* 1. SYMBOL: THE KUFIYA BRACKETS */}
      <motion.div 
        variants={containerVariants}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        className="h-full aspect-square flex items-center justify-center relative text-black dark:text-white"
      >
        <svg viewBox="0 0 60 60" className="w-full h-full overflow-visible drop-shadow-sm">
           {/* Left Bracket (<) */}
           <motion.path 
             d="M24 10 L6 30 L24 50" 
             fill="none"
             stroke="currentColor" 
             strokeWidth="4" 
             strokeLinecap="round" 
             strokeLinejoin="round"
             initial={{ pathLength: 0, x: 10, opacity: 0 }} 
             animate={{ pathLength: 1, x: 0, opacity: 1 }} 
             transition={{ duration: 0.6, ease: "easeOut" }}
           />
           
           {/* Right Bracket (>) */}
           <motion.path 
             d="M36 10 L54 30 L36 50" 
             fill="none"
             stroke="currentColor" 
             strokeWidth="4" 
             strokeLinecap="round" 
             strokeLinejoin="round"
             initial={{ pathLength: 0, x: -10, opacity: 0 }} 
             animate={{ pathLength: 1, x: 0, opacity: 1 }} 
             transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
           />

           {/* Central Tension Nodes (The Gap) */}
           <motion.circle 
             cx="12" cy="30" r="2.5" fill="currentColor"
             initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}
           />
           <motion.circle 
             cx="48" cy="30" r="2.5" fill="currentColor"
             initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
           />
        </svg>
      </motion.div>
      
      {/* 2. TYPOGRAPHY: PALSTYLE (Flag-E) */}
      <div className="flex flex-col justify-center h-full pt-1">
        <div className="flex items-center tracking-[0.1em] font-black text-2xl md:text-3xl text-black dark:text-white leading-none">
           <span>PALSTYL</span>
           
           {/* THE FLAG 'E' */}
           <div className="flex h-[0.8em] ml-[3px] relative items-center">
              {/* Vertical Spine (Red Triangle) */}
              <motion.div 
                initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ delay: 0.6 }}
                className="w-[5px] h-full bg-red-600 rounded-sm"
              />
              
              {/* Horizontal Bars Container */}
              <div className="flex flex-col justify-between h-full ml-[2px] w-[16px]">
                  {/* Top: Black */}
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.7 }}
                    className="h-[22%] bg-black dark:bg-white rounded-r-sm"
                  />
                  {/* Middle: White/Grey */}
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ delay: 0.8 }}
                    className="h-[22%] bg-neutral-400 rounded-r-sm"
                  />
                  {/* Bottom: Green */}
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.9 }}
                    className="h-[22%] bg-green-600 rounded-r-sm"
                  />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
