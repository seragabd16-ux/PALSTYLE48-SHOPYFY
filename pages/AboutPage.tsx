
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { KufiyaSeparator } from '../components/KufiyaSeparator';
import { generateBrandStory } from '../services/geminiService';
import { Sparkles, ArrowDown, RefreshCw } from 'lucide-react';

// --- 3D HERO COMPONENT ---
const CinematicAboutHero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Heavy, cinematic physics
  const mouseX = useSpring(x, { stiffness: 30, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 30, damping: 30 });

  // 3D Rotations
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Layer Parallax (Opposing directions for depth)
  const textX = useTransform(mouseX, [-0.5, 0.5], ["20px", "-20px"]);
  const textY = useTransform(mouseY, [-0.5, 0.5], ["20px", "-20px"]);
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-10px", "10px"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-10px", "10px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    x.set(mouseXVal / width - 0.5);
    y.set(mouseYVal / height - 0.5);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-black perspective-1000"
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* LAYER 1: 4K CINEMATIC BACKGROUND (Deep Depth) */}
        <motion.div 
          style={{ x: bgX, y: bgY, scale: 1.1, transform: "translateZ(-100px)" }}
          className="absolute inset-0 z-0"
        >
           <video 
             autoPlay muted loop playsInline
             className="w-full h-full object-cover opacity-40 grayscale contrast-125"
           >
             {/* Abstract Smoke/Ink in Water 4K feel */}
             <source src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </motion.div>

        {/* LAYER 2: TYPOGRAPHY (Floating Foreground) */}
        <motion.div 
          style={{ x: textX, y: textY, transform: "translateZ(50px)" }}
          className="relative z-10 text-center flex flex-col items-center"
        >
           {/* Top Tagline */}
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="flex items-center gap-4 mb-6"
           >
              <div className="h-[1px] w-12 bg-red-600" />
              <span className="text-white font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase">
                Established 1948
              </span>
              <div className="h-[1px] w-12 bg-red-600" />
           </motion.div>

           {/* Main Title Stack */}
           <h1 className="flex flex-col items-center leading-[0.85] font-black text-white mix-blend-difference">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-[10rem] tracking-tighter block"
              >
                THE STORY
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-[10rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-500 to-transparent block"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
              >
                OF
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4, duration: 1.2, type: "spring" }}
                className="text-[5rem] md:text-[8rem] lg:text-[12rem] tracking-tighter text-red-600 block mt-2 drop-shadow-[0_20px_50px_rgba(220,38,38,0.3)]"
              >
                RESISTANCE
              </motion.span>
           </h1>

           {/* Bottom Manifesto */}
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.5, duration: 1 }}
             className="max-w-md text-neutral-400 text-xs md:text-sm font-mono tracking-widest uppercase mt-12 leading-relaxed"
           >
             We do not design for the season.<br/>
             We design for the history books.
           </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 z-20"
        >
           <span className="text-[9px] text-neutral-600 uppercase tracking-widest">Scroll to Decrypt</span>
           <ArrowDown className="text-white animate-bounce w-4 h-4" />
        </motion.div>

      </motion.div>
    </section>
  );
};

// --- CONTENT SECTION ---
const Section: React.FC<{ title: string; subtitle: string; text: string; image: string; align?: 'left' | 'right' }> = ({ title, subtitle, text, image, align = 'left' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-24">
      {/* Background Parallax Image */}
      <div className="absolute inset-0 z-0">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
      </div>

      <div className={`container mx-auto px-6 relative z-10 flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <motion.div 
          initial={{ opacity: 0, x: align === 'right' ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
             <span className="w-12 h-[2px] bg-red-600"></span>
             <span className="text-red-600 font-bold tracking-[0.4em] uppercase text-xs">{subtitle}</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8 mix-blend-difference">
            {title}
          </h2>
          <p className="text-xl text-neutral-300 font-light leading-relaxed">
            {text}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const [aiManifesto, setAiManifesto] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchStory = async () => {
    setIsGenerating(true);
    const story = await generateBrandStory();
    setAiManifesto(story);
    setIsGenerating(false);
  };

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      
      {/* 3D CINEMATIC HERO */}
      <CinematicAboutHero />

      <KufiyaSeparator />

      {/* AI MANIFESTO SECTION */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-red-600 border border-red-600/30 px-3 py-1 rounded-full mb-8 backdrop-blur-md"
          >
              <Sparkles size={14} />
              <span className="text-[10px] font-bold tracking-widest uppercase">Origin Story / Neural Link</span>
          </motion.div>
          
          <div className="min-h-[200px] flex items-center justify-center">
            {isGenerating ? (
               <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-white/20 border-t-red-600 rounded-full animate-spin" />
                  <span className="text-xs font-mono text-neutral-500 animate-pulse">DECRYPTING ARCHIVES...</span>
               </div>
            ) : (
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-2xl md:text-4xl font-light text-white leading-relaxed font-serif italic"
                >
                    "{aiManifesto || "Protocol failure. Retrying..."}"
                </motion.p>
            )}
          </div>

          <button 
            onClick={fetchStory}
            disabled={isGenerating}
            className="mt-12 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-neutral-500 hover:text-white uppercase transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} />
            Re-Initialize Protocol
          </button>
      </div>

      <Section 
        title="Roots of Land" 
        subtitle="Chapter 01"
        text="The olive tree is not just a plant; it is a witness. Deeply rooted in the soil of Palestine, it represents centuries of presence, endurance, and life. Our designs draw directly from this organic resilience."
        image="https://images.unsplash.com/photo-1628174392663-3e722df3046f?q=80&w=1000&auto=format&fit=crop"
      />

      <Section 
        title="The Kufiya" 
        subtitle="Chapter 02"
        align="right"
        text="A fishing net turned into a shield. The Kufiya pattern is a language of the sea and the trade routes. Today, it is the global symbol of freedom. We deconstruct this pattern and rebuild it for the modern street."
        image="https://images.unsplash.com/photo-1580227974597-27b998394464?q=80&w=1000&auto=format&fit=crop"
      />

      <Section 
        title="Gaza Youth" 
        subtitle="Chapter 03"
        text="Behind every stitch is a young hand dreaming of a horizon without borders. Palstyle48 is driven by the creative energy of Gaza's youth—engineers, artists, and designers refusing to be silenced."
        image="https://images.unsplash.com/photo-1532598369324-5d5d3090710e?q=80&w=1000&auto=format&fit=crop"
      />

      <div className="py-24 text-center">
         <h3 className="text-white font-bold tracking-widest uppercase mb-4">Join the Movement</h3>
         <p className="text-neutral-500 max-w-md mx-auto text-sm font-mono mb-8">
            Wear the history. Be the voice.
         </p>
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/800px-Flag_of_Palestine.svg.png" className="h-12 mx-auto opacity-80" alt="Flag" />
      </div>

    </div>
  );
};
