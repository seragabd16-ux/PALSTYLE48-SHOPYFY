
import React from 'react';
import { motion } from 'framer-motion';

export const KufiyaPattern: React.FC = () => {
  return (
    <div className="w-full h-64 bg-black relative overflow-hidden border-t border-neutral-900/50 perspective-[1000px]">
      
      {/* 
          ENHANCED STRATEGY: Organic Fabric Simulation
          Refined physics for a 'breathing' wave effect.
          We use conflicting scale/skew animations to create a "Moiré" interference pattern.
      */}

      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950/80 to-black z-10 pointer-events-none" />

      {/* Layer 1: Base Structure - The 'Heavy' Cloth */}
      <motion.div 
        className="absolute inset-[-25%] w-[150%] h-[150%] opacity-20 text-neutral-700 origin-center"
        animate={{ 
          scaleX: [1, 1.08, 1], 
          scaleY: [1, 0.92, 1], 
          skewX: [0, 4, 0, -4, 0], // Increased skew for wave effect
          rotate: [0, 2, 0, -2, 0],
          x: ["0%", "-3%", "0%", "3%", "0%"],
        }}
        transition={{ 
          duration: 24, // Slower, more luxurious
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
      >
        <svg width="100%" height="100%" fill="none">
           <pattern id="kufiyaBase" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30 L30 0 L60 30 L30 60 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="30" cy="30" r="1.5" fill="currentColor" />
              <path d="M30 0 V60 M0 30 H60" stroke="currentColor" strokeWidth="0.5" className="opacity-50" />
           </pattern>
           <rect width="100%" height="100%" fill="url(#kufiyaBase)" />
        </svg>
      </motion.div>

      {/* Layer 2: Interference Mesh - The 'Sheen' */}
      <motion.div 
        className="absolute inset-[-25%] w-[150%] h-[150%] opacity-10 text-neutral-500 mix-blend-overlay origin-center"
        animate={{ 
          scaleX: [1.05, 0.95, 1.05], 
          scaleY: [0.95, 1.05, 0.95],
          skewY: [0, 3, 0, -3, 0],
          x: ["0%", "2%", "0%", "-2%", "0%"],
        }}
        transition={{ 
          duration: 18, // Desynchronized duration
          repeat: Infinity, 
          ease: "easeInOut", 
        }}
      >
        <svg width="100%" height="100%" fill="none">
           <pattern id="kufiyaMesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0h40v40H0z" fill="none"/>
              <path d="M0 40 L40 0" stroke="currentColor" strokeWidth="0.5" />
              <path d="M0 0 L40 40" stroke="currentColor" strokeWidth="0.5" />
           </pattern>
           <rect width="100%" height="100%" fill="url(#kufiyaMesh)" />
        </svg>
      </motion.div>

      {/* Lighting: The 'Heartbeat' Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-red-900/10 via-transparent to-transparent blur-3xl pointer-events-none"
        animate={{ 
          opacity: [0.1, 0.25, 0.1], 
          scale: [0.95, 1.1, 0.95],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20 pointer-events-none" />
    </div>
  );
};
