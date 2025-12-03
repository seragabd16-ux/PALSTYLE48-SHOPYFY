
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const ProductCard: React.FC<{ product: Product; index?: number }> = ({ product, index = 0 }) => {
  const { addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [acquisitionStatus, setAcquisitionStatus] = useState<'idle' | 'secured'>('idle');

  // Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleAcquisition = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize);
    setAcquisitionStatus('secured');
    setTimeout(() => setAcquisitionStatus('idle'), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative w-full aspect-[3/4] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-transparent cursor-pointer group shadow-lg dark:shadow-none overflow-hidden"
    >
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
            {/* Image Layer */}
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <motion.img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    animate={{ scale: isHovered ? 1.05 : 1, filter: isHovered ? 'grayscale(0%) blur(0px)' : 'grayscale(100%) blur(0px)' }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full h-full object-cover opacity-90 transition-all duration-700"
                />
                
                {/* Rack Focus Blur Layer */}
                <motion.div 
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 backdrop-blur-[2px] bg-black/10 pointer-events-none"
                />

                {/* Grain Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Resting State Info - Exits Smoothly */}
            <motion.div 
                animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -20 : 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="absolute bottom-6 left-6 right-6 pointer-events-none z-10"
            >
                <h3 className="text-black dark:text-white font-bold tracking-tight text-lg uppercase mb-1 drop-shadow-md dark:drop-shadow-none">{product.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-mono text-xs">$ {product.price}.00</p>
            </motion.div>
        </Link>

        {/* Tactical HUD (Hover) */}
        <AnimatePresence>
            {isHovered && (
                <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute bottom-0 left-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-neutral-200 dark:border-white/10 p-5 z-20"
                >
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.05 } }
                        }}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <motion.div 
                                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                className="max-w-[70%]"
                            >
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white leading-tight">{product.name}</h3>
                                <span className="text-[9px] text-neutral-500 font-mono mt-1 block">{product.category} // S-04</span>
                            </motion.div>
                            <motion.span 
                                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                className="text-sm font-mono text-black dark:text-white"
                            >
                                $ {product.price}
                            </motion.span>
                        </div>

                        <motion.div 
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="flex gap-1 mb-4"
                        >
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button 
                                    key={size}
                                    onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                                    className={`flex-1 h-8 text-[10px] font-bold border transition-all ${
                                        selectedSize === size 
                                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' 
                                        : 'bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-800 hover:border-black dark:hover:border-neutral-500 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </motion.div>

                        <motion.button 
                            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                            onClick={handleAcquisition}
                            disabled={acquisitionStatus === 'secured'}
                            className={`w-full h-10 text-[10px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                                acquisitionStatus === 'secured' 
                                ? 'bg-neutral-200 dark:bg-white text-black' 
                                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
                            }`}
                        >
                            <AnimatePresence mode="wait">
                                {acquisitionStatus === 'secured' ? (
                                    <motion.div 
                                        key="secured"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Check size={14} strokeWidth={3} /> UNIT SECURED
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="idle"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2"
                                    >
                                        <ShoppingBag size={12} /> INITIALIZE ACQUISITION
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2 pointer-events-none z-20">
            {product.stock < 20 && (
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 bg-red-100 dark:bg-red-900/50 backdrop-blur-md border border-red-500/30 text-[8px] font-bold text-red-600 dark:text-red-500 uppercase tracking-widest flex items-center gap-2 pointer-events-auto cursor-help transition-colors"
                >
                    <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"/> LOW STOCK
                </motion.div>
            )}
        </div>
    </motion.div>
  );
};
