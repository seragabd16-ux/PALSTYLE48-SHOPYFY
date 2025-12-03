import React from 'react';
import { Logo } from './Logo';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black opacity-80" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      
      {/* Central Loading Unit */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Orbital Spinner */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 rounded-full border border-white/5 border-t-red-600 border-r-transparent"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-24 h-24 rounded-full border border-white/5 border-b-white/20 border-l-transparent"
        />

        {/* Logo Icon Only */}
        <div className="relative z-10 p-8 backdrop-blur-xl bg-black/50 rounded-full border border-white/5 shadow-2xl">
          <Logo className="h-10 w-10" animated={true} />
        </div>

        {/* Text */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-16 text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase"
        >
          Initializing Protocol
        </motion.p>
      </div>
    </div>
  );
};