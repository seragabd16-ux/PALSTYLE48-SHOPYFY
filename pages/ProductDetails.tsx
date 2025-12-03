
import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);

  if (!product) return <div className="text-white text-center pt-40">Product not found</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-90" />
        </motion.div>

        <div className="flex flex-col justify-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase">{product.category}</span>
            <h1 className="text-5xl font-black text-white tracking-tight mt-2 mb-4">{product.name}</h1>
            <p className="text-2xl text-neutral-300 font-mono">${product.price}.00</p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-neutral-400 leading-relaxed font-light text-lg"
          >
            {product.description}
          </motion.p>

          <div className="space-y-4 pt-8">
            <div className="flex gap-4">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button key={size} className="w-12 h-12 border border-neutral-800 text-neutral-400 hover:border-white hover:text-white transition-all flex items-center justify-center text-xs font-bold">
                  {size}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-white text-black py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};