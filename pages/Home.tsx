
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { CinematicHero } from '../components/CinematicHero';
import { SocialStories } from '../components/SocialStories';
import { SectorGrid } from '../components/SectorGrid'; 
import { HomePortals } from '../components/HomePortals';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { products } = useStore();
  
  // Parallax Logic for Manifesto
  const manifestoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  // Featured Drops (First 4 items)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black overflow-x-hidden transition-colors duration-700">
      
      {/* 1. HERO SECTION */}
      <CinematicHero />

      {/* 2. MARKETING TICKER */}
      <div className="bg-red-600 py-3 overflow-hidden relative z-20 border-y border-red-500">
         <motion.div 
           animate={{ x: ["0%", "-100%"] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="flex whitespace-nowrap gap-12 text-white text-[10px] font-black tracking-widest uppercase"
         >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center gap-12">
                    <span>FREE WORLDWIDE SHIPPING ON ORDERS OVER $200</span>
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>LIMITED STOCK DROP</span>
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>GAZA HERITAGE</span>
                    <span className="w-2 h-2 bg-white rounded-full" />
                </span>
            ))}
         </motion.div>
      </div>

      {/* 3. MANIFESTO SECTION */}
      <section ref={manifestoRef} className="py-32 relative flex items-center justify-center min-h-[60vh] overflow-hidden bg-neutral-50 dark:bg-black z-10">
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
             <motion.div 
               style={{ y: textY }}
               className="w-full h-[150%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Keffiyeh_pattern.svg/1200px-Keffiyeh_pattern.svg.png')] bg-repeat opacity-30 dark:invert"
             />
         </div>
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div style={{ opacity, y: textY }}>
                <span className="text-red-600 font-bold tracking-[0.4em] text-xs uppercase mb-6 block">The Protocol</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight uppercase tracking-tighter">
                   We do not design clothes.<br/>
                   We design <span className="text-red-600">Armor</span> for the<br/>
                   Underground.
                </h2>
            </motion.div>
         </div>
      </section>

      {/* 4. SECTOR GRID (Categories) */}
      <SectorGrid />

      {/* 5. TRINITY PORTALS */}
      <HomePortals />

      {/* 6. LATEST DROPS */}
      <section className="py-24 max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
              <div>
                  <h3 className="text-4xl font-black text-black dark:text-white uppercase tracking-tighter">Latest Drops</h3>
                  <div className="h-1 w-24 bg-red-600 mt-4" />
              </div>
              <Link to="/category/Collection" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                  View All Archive <MoveRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
              ))}
          </div>
      </section>

      {/* 7. SOCIAL FEED */}
      <SocialStories />

    </div>
  );
};
