
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowDown, Scan, Crosshair } from 'lucide-react';

export const CinematicHero: React.FC = () => {
  const { heroVideoUrl } = useStore();
  
  // Default Video: High contrast, moody, fashion forward
  // Using a darker, more textured video for the Eclipse effect
  const DEFAULT_VIDEO = "https://videos.pexels.com/video-files/5527814/5527814-uhd_2560_1440_25fps.mp4";

  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics for the flashlight lag
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Create the mask gradient based on mouse position
  // We use pixel values for the gradient center
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  // The mask image template
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`;

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center cursor-crosshair"
    >
      
      {/* --- LAYER 1: THE VOID (Base State) --- */}
      {/* Grayscale, Darkened, Outlined Text */}
      <div className="absolute inset-0 z-0">
         <video 
            autoPlay muted loop playsInline
            key={heroVideoUrl || DEFAULT_VIDEO} 
            className="w-full h-full object-cover filter grayscale brightness-[0.25] contrast-125 scale-105"
         >
            <source src={heroVideoUrl || DEFAULT_VIDEO} type="video/mp4" />
         </video>
         
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
         
         {/* Ghost Typography */}
         <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <h1 className="text-[12vw] font-black tracking-tighter text-transparent uppercase leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
               PALSTYLE
            </h1>
            <h1 className="text-[12vw] font-black tracking-tighter text-transparent uppercase leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
               <span className="text-[4vw] tracking-[1em] align-middle mr-8 font-mono">EST.</span>48
            </h1>
         </div>
      </div>

      {/* --- LAYER 2: THE REVEAL (Active State) --- */}
      {/* Full Color, Solid Text, Masked by Mouse */}
      <motion.div 
        style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
         <video 
            autoPlay muted loop playsInline
            className="w-full h-full object-cover scale-105"
         >
            <source src={heroVideoUrl || DEFAULT_VIDEO} type="video/mp4" />
         </video>

         {/* Solid Typography */}
         <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h1 className="text-[12vw] font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
               PALSTYLE
            </h1>
            <h1 className="text-[12vw] font-black tracking-tighter text-red-600 uppercase leading-none drop-shadow-2xl">
               <span className="text-[4vw] tracking-[1em] align-middle mr-8 font-mono text-white">EST.</span>48
            </h1>
         </div>
      </motion.div>

      {/* --- UI OVERLAYS (Tactical HUD) --- */}
      {/* Top Left */}
      <div className="absolute top-32 left-8 md:left-12 z-30 mix-blend-difference text-white">
         <div className="flex items-center gap-2 mb-2">
            <Scan className="animate-spin-slow w-4 h-4 text-red-500" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Targeting System Active</span>
         </div>
         <p className="text-[9px] text-neutral-400 max-w-[150px]">
            Move cursor to decrypt the signal. Reveal the archive.
         </p>
      </div>

      {/* Center Targeting Reticle (Follows Mouse) */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-white/30 rounded-full z-50 pointer-events-none flex items-center justify-center mix-blend-difference"
      >
         <div className="w-1 h-1 bg-red-600 rounded-full" />
      </motion.div>

      {/* Bottom Center */}
      <div className="absolute bottom-12 z-30 flex flex-col items-center">
          <Link to="/category/Hoodies" className="group flex flex-col items-center gap-4 cursor-pointer">
             <div className="h-16 w-[1px] bg-white/20 overflow-hidden relative">
                <motion.div 
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full bg-red-600"
                />
             </div>
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white group-hover:text-red-500 transition-colors">
                Initialize
             </span>
          </Link>
      </div>

      {/* Floating Particles (Depth) */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay">
         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full blur-[2px] animate-pulse" />
         <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full blur-[1px] animate-ping" />
      </div>

    </section>
  );
};
