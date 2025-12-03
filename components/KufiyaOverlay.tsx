
import React from 'react';
import { motion } from 'framer-motion';

export const KufiyaOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay opacity-5 overflow-hidden">
      <motion.div 
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="kufiya" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="white" strokeWidth="1" />
              <rect x="18" y="18" width="4" height="4" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kufiya)" />
        </svg>
      </motion.div>
    </div>
  );
};