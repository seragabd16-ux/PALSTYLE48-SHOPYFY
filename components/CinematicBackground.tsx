
import React from 'react';
import { motion } from 'framer-motion';

export const CinematicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
      {/* 1. Deep Atmospheric Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-black" />

      {/* 2. Volumetric Spotlights (Moving Fog) */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] left-[20%] w-[60%] h-[60%] bg-neutral-800/10 blur-[120px] rounded-full mix-blend-screen"
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2], x: [-20, 20, -20] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-neutral-700/5 blur-[100px] rounded-full mix-blend-screen"
      />

      {/* 3. Cinematic "Film Grain" Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* 4. Abstract Model Silhouette / Depth Blur */}
      {/* This simulates a figure in the deep background, out of focus, giving "Set Depth" */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
         <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 3 }}
           className="w-[80vw] h-[80vh] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] blur-3xl"
         />
      </div>

      {/* 5. The Kufiya "Laser" Grid - Moving slowly like a scanner */}
      <div className="absolute inset-0 perspective-1000">
        <motion.div 
          style={{ rotateX: 60 }}
          animate={{ translateY: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-[200%] absolute -top-1/2 opacity-[0.05]"
        >
           <svg width="100%" height="100%" fill="none">
              <pattern id="cinematicGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                 <path d="M100 0L0 0M0 100L0 0" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#cinematicGrid)" />
           </svg>
        </motion.div>
      </div>
    </div>
  );
};
