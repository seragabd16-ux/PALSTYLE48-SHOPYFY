import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface CategoryPageProps {
  forcedCategory?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ forcedCategory }) => {
  const { category } = useParams<{ category: string }>();
  const { products } = useStore();
  const targetCategory = forcedCategory || category || 'Collection';
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Filter products
  let displayProducts = products.filter(p => 
    p.category.toLowerCase() === targetCategory.toLowerCase()
  );

  // If "Collection" or empty match, show all (fallback behavior for demo)
  if (displayProducts.length === 0 && targetCategory === 'Collection') {
      displayProducts = products;
  }

  // Sort
  if (sortBy === 'price-asc') displayProducts.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') displayProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      
      {/* SECTOR HEADER */}
      <div className="relative h-[40vh] md:h-[50vh] flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden">
        {/* Animated Background Text */}
        <motion.div 
            initial={{ x: "10%" }}
            animate={{ x: "-10%" }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
            className="absolute top-0 left-0 whitespace-nowrap opacity-[0.05] pointer-events-none select-none"
        >
            <h1 className="text-[20vw] font-black leading-none uppercase">{targetCategory} SECTOR 04 //</h1>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-red-600"></div>
                <span className="text-red-600 font-mono text-xs tracking-[0.3em] uppercase">Restricted Access</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mix-blend-difference text-white mb-2">
                {targetCategory}
            </h1>
            <p className="max-w-md text-neutral-500 font-mono text-xs uppercase tracking-widest leading-relaxed">
                Processing artifact retrieval. <br/>
                Signal strength: 100%. <br/>
                {displayProducts.length} units secure.
            </p>
        </motion.div>
      </div>

      {/* TACTICAL HUD CONTROL BAR */}
      <div className="sticky top-24 z-30 bg-black/80 backdrop-blur-md border-y border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2 text-neutral-500">
                    <Activity size={14} className="text-red-600 animate-pulse" />
                    <span className="text-[10px] tracking-widest uppercase font-bold">Live Feed</span>
                 </div>
                 <div className="h-4 w-[1px] bg-white/10" />
                 <span className="text-[10px] tracking-widest uppercase text-neutral-500">{displayProducts.length} Items</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="hidden md:inline text-[10px] uppercase tracking-widest text-neutral-600">Sort Sequence:</span>
                <div className="flex bg-white/5 rounded-sm p-1">
                    <button 
                        onClick={() => setSortBy('default')}
                        className={`px-3 py-1 text-[10px] uppercase font-bold transition-all ${sortBy === 'default' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                    >
                        Signal
                    </button>
                    <button 
                        onClick={() => setSortBy('price-asc')}
                        className={`px-3 py-1 text-[10px] uppercase font-bold transition-all ${sortBy === 'price-asc' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                    >
                        Low
                    </button>
                    <button 
                        onClick={() => setSortBy('price-desc')}
                        className={`px-3 py-1 text-[10px] uppercase font-bold transition-all ${sortBy === 'price-desc' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                    >
                        High
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* GRID INTERFACE */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
        >
            {displayProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
            ))}
        </motion.div>
        
        {displayProducts.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-neutral-600">
                <p className="text-xs uppercase tracking-[0.3em] mb-2">Sector Empty</p>
                <div className="w-12 h-[1px] bg-red-900/50"></div>
            </div>
        )}
      </div>

    </div>
  );
};