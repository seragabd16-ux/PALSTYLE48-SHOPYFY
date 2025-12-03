
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X, Minus, Plus, ShoppingBag, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, addToCart, language } = useStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const translations = {
    en: { title: 'YOUR SELECTION', empty: 'YOUR BAG IS EMPTY', checkout: 'PROCEED TO CHECKOUT', taxes: 'Taxes & Duties included' },
    tr: { title: 'SEÇİMLERİNİZ', empty: 'SEPETİNİZ BOŞ', checkout: 'ÖDEMEYE GEÇ', taxes: 'Vergiler dahildir' },
    ar: { title: 'مشترياتك', empty: 'السلة فارغة', checkout: 'إتمام الشراء', taxes: 'شامل الضرائب والرسوم' }
  };

  const t = translations[language] || translations.en;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-black border-l border-neutral-800 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-900 flex items-center justify-between bg-neutral-950">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-white" />
                <h2 className="text-sm font-black tracking-[0.2em] text-white">{t.title}</h2>
              </div>
              <button onClick={toggleCart} className="text-neutral-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-600 gap-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-xs tracking-widest uppercase">{t.empty}</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${(item as any).selectedSize}`} className="flex gap-4 bg-neutral-900/20 p-4 rounded-sm border border-neutral-900/50">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-sm grayscale opacity-80" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-white tracking-wider">{item.name}</h3>
                        <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">{item.category} | Size: {(item as any).selectedSize}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-neutral-800 rounded-sm">
                          <button 
                            onClick={() => item.quantity > 1 ? addToCart({...item, quantity: -1} as any, (item as any).selectedSize) : removeFromCart(item.id, (item as any).selectedSize)}
                            className="px-2 py-1 hover:bg-white hover:text-black transition-colors text-neutral-400"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-mono text-white">{item.quantity}</span>
                          <button 
                            onClick={() => addToCart(item, (item as any).selectedSize)}
                            className="px-2 py-1 hover:bg-white hover:text-black transition-colors text-neutral-400"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer & Checkout */}
            <div className="p-6 border-t border-neutral-900 bg-neutral-950">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-neutral-500 text-xs tracking-widest uppercase">
                  <span>{t.taxes}</span>
                  <span>Calculated</span>
                </div>
                <div className="flex justify-between items-center text-white font-black text-xl">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/checkout" 
                onClick={toggleCart}
                className="w-full bg-white text-black py-4 font-black tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Lock size={16} className="group-hover:hidden" />
                <span className="group-hover:hidden">{t.checkout}</span>
                <span className="hidden group-hover:inline-block">SECURE CHECKOUT</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
