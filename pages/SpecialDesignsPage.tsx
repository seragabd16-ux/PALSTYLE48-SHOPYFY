
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scan } from 'lucide-react';

const DESIGNS = [
  {
    id: 'ART-001',
    title: 'THE KEY OF RETURN',
    description: 'A brutalist interpretation of the historic key. Heavy iron aesthetics.',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop', // Placeholder for art
    tag: 'HERITAGE'
  },
  {
    id: 'ART-002',
    title: 'OLIVE ROOTS',
    description: 'Deep root systems intertwined with barbed wire. Symbolizing endurance.',
    image: 'https://images.unsplash.com/photo-1533158388470-9a56699990c6?q=80&w=1000&auto=format&fit=crop',
    tag: 'RESISTANCE'
  },
  {
    id: 'ART-003',
    title: 'HANDALA 2025',
    description: 'The witness, reimagined in a cyberpunk noire style.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    tag: 'ICON'
  },
  {
    id: 'ART-004',
    title: 'KUFIYA WIREFRAME',
    description: 'The pattern deconstructed into digital topography.',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop',
    tag: 'DIGITAL'
  },
  {
    id: 'ART-005',
    title: 'DOME SILHOUETTE',
    description: 'Golden ratio geometry applied to the sacred dome.',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop',
    tag: 'SACRED'
  },
  {
    id: 'ART-006',
    title: 'FREEDOM COORDINATES',
    description: 'GPS coordinates of every destroyed village, overlaid.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
    tag: 'DATA'
  }
];

interface DesignCardProps {
  design: typeof DESIGNS[0];
  index: number;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle Physics: Low stiffness/damping for a heavy, smooth feel
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Range: +/- 2.5 degrees (Very subtle, barely perceptible depth)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["2.5deg", "-2.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);
  
  // Glare effect
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 80%)`;

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
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <div
      className="group perspective-container aspect-square cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.8 }}
        viewport={{ once: true }}
        whileTap={{ scale: 0.98 }}
        animate={{ 
            borderColor: isClicked ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.05)" 
        }}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className="relative w-full h-full bg-neutral-900 border border-white/5 overflow-hidden shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] rounded-sm"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div 
            style={{ background: glareBackground }}
            className="absolute inset-0 pointer-events-none z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        />

        {/* Tactile Click Feedback Overlay */}
        <AnimatePresence>
          {isClicked && (
              <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-overlay"
              />
          )}
        </AnimatePresence>

        {/* Content Container - Needs distinct z-index for 3D layering */}
        <div style={{ transform: "translateZ(0px)" }} className="absolute inset-0 w-full h-full">
           {/* Image Layer */}
           <div className="absolute inset-0">
              <motion.img 
                src={design.image} 
                alt={design.title}
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
           </div>

           {/* Overlay UI */}
           <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
              
              <div 
                style={{ transform: "translateZ(30px)" }}
                className="flex justify-between items-start translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
              >
                 <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest shadow-lg">
                   {design.tag}
                 </span>
                 <Scan className="text-white w-5 h-5 animate-spin-slow" />
              </div>

              <div 
                style={{ transform: "translateZ(20px)" }}
                className="translate-y-[20px] group-hover:translate-y-0 transition-transform duration-500"
              >
                 <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 leading-none drop-shadow-xl">
                   {design.title}
                 </h3>
                 <p className="text-neutral-400 text-xs font-mono mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                   {design.description}
                 </p>
                 
                 <Link 
                   to="/custom-print" 
                   className="flex items-center gap-4 group/btn pointer-events-auto"
                   onClick={(e) => e.stopPropagation()} 
                 >
                    <div className="h-[1px] w-12 bg-white/30 group-hover/btn:w-24 group-hover/btn:bg-red-600 transition-all duration-300" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] group-hover/btn:text-red-500 transition-colors">
                       Deploy Asset
                    </span>
                 </Link>
              </div>
           </div>

           {/* Cinematic Glitch/Noise Overlay */}
           <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ transform: "translateZ(10px)" }}
                  className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"
                />
              )}
           </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export const SpecialDesignsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10" />
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none z-10" />

      {/* Kufiya Motion Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]">
         <motion.div 
           className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2"
           animate={{ 
             rotate: [0, 5, 0],
             scale: [1, 1.05, 1],
             filter: ["blur(4px)", "blur(0px)", "blur(4px)"]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
         >
            <svg width="100%" height="100%">
               <pattern id="kufiyaSpecial" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="white" strokeWidth="1.5" />
                  <rect x="48" y="48" width="4" height="4" fill="white" />
                  <circle cx="50" cy="20" r="2" fill="white" className="opacity-50" />
                  <circle cx="50" cy="80" r="2" fill="white" className="opacity-50" />
                  <circle cx="20" cy="50" r="2" fill="white" className="opacity-50" />
                  <circle cx="80" cy="50" r="2" fill="white" className="opacity-50" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#kufiyaSpecial)" />
            </svg>
         </motion.div>
      </div>

      {/* Header */}
      <div className="max-w-[1600px] mx-auto mb-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <span className="w-2 h-2 bg-red-600 rounded-sm animate-pulse" />
               <span className="text-red-600 text-[10px] font-bold tracking-[0.4em] uppercase">Private Archive</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
              SPECIAL <br/> <span className="text-neutral-700">DESIGNS</span>
            </h1>
          </div>
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest text-right max-w-sm mt-8 md:mt-0">
            Exclusive graphics forged in the dark. <br/>
            Select a design to initialize deployment.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DESIGNS.map((design, index) => (
          <DesignCard key={design.id} design={design} index={index} />
        ))}
      </div>

      {/* Footer Note */}
      <div className="max-w-[1600px] mx-auto mt-20 border-t border-white/10 pt-8 flex justify-between items-center text-neutral-600 text-[10px] uppercase tracking-widest font-mono">
         <span>Total Assets: {DESIGNS.length}</span>
         <span>Security Level: Maximum</span>
      </div>

    </div>
  );
};
