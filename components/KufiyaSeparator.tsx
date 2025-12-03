
import React from 'react';
import { motion } from 'framer-motion';

export const KufiyaSeparator: React.FC = () => {
  return (
    <div className="w-full h-32 relative overflow-hidden flex items-center justify-center py-8">
      
      {/* Background Soft Flow */}
      <div className="absolute inset-0 opacity-[0.08]">
         <motion.div 
           className="w-[150%] h-[150%] absolute -top-[25%] -left-[25%]"
           animate={{ 
             x: ["0%", "-10%", "0%"],
             rotate: [0, 5, 0] 
           }}
           transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
         >
             <svg width="100%" height="100%">
               <pattern id="sepPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="white" strokeWidth="0.5" />
                 <circle cx="20" cy="20" r="1" fill="white" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#sepPattern)" />
             </svg>
         </motion.div>
      </div>
      
      {/* Gradient Masks */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>

      {/* The Center Branding Mark */}
      <div className="relative z-10 px-6">
        <div className="relative">
            {/* Horizontal Line */}
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 200, opacity: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            
            {/* The Rotating Node */}
            <motion.div 
              initial={{ rotate: 45, scale: 0 }}
              whileInView={{ rotate: 225, scale: 1 }}
              transition={{ duration: 1.5, ease: "backOut" }}
              viewport={{ once: false, margin: "-20px" }}
              className="w-3 h-3 border border-white bg-black rotate-45 relative z-20 mx-auto"
            >
                <div className="absolute inset-[2px] bg-white/20"></div>
            </motion.div>
        </div>
      </div>

    </div>
  );
};
