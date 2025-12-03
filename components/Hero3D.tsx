
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Upload } from 'lucide-react';

interface Hero3DProps {
  image: string;
}

export const Hero3D: React.FC<Hero3DProps> = ({ image }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    const xPct = mouseXVal / width - 0.5;
    const yPct = mouseYVal / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        perspective: 1000 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-[320px] h-[450px] md:w-[450px] md:h-[600px] cursor-grab active:cursor-grabbing z-20 group"
    >
      {/* The Glass Container */}
      <motion.div 
        style={{ 
          transform: "translateZ(20px)",
          filter: "brightness(1)" 
        }}
        className="absolute inset-0 bg-neutral-900/5 backdrop-blur-sm border border-white/10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Dynamic Shine/Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none z-30" />
        
        <motion.img 
           style={{ filter: useTransform(brightness, b => `brightness(${b})`) }}
           src={image} 
           alt="Hero Product" 
           className="w-full h-full object-cover"
        />

        {/* 3D Floating UI Elements inside the card */}
        <div style={{ transform: "translateZ(60px)" }} className="absolute top-8 left-8 border-l-2 border-white pl-4">
           <p className="text-[10px] text-white/80 tracking-[0.3em] uppercase">Season 2025</p>
           <p className="text-xl font-black text-white tracking-tighter">GAZA SPIRIT</p>
        </div>

        {/* Integrate Upload Design Button */}
        <div style={{ transform: "translateZ(50px)" }} className="absolute bottom-8 left-8">
           <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 group-hover:scale-105">
             <Upload size={14} />
             <span className="text-[10px] font-bold tracking-widest uppercase">Upload Design</span>
           </button>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="absolute bottom-8 right-8">
           <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-black/20">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
               <path d="M12 5v14M5 12h14" />
             </svg>
           </div>
        </div>
      </motion.div>
      
      {/* Shadow */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/80 blur-xl rounded-[100%] opacity-60" />
    </motion.div>
  );
};
