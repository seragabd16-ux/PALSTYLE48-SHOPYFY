
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CreditCard, ShieldCheck, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CheckoutPage: React.FC = () => {
  const { cart } = useStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
    }, 3000);
  };

  if (step === 3) {
      return (
          <div className="min-h-screen bg-black flex items-center justify-center px-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-neutral-900/50 border border-green-500/30 p-12 rounded-2xl text-center backdrop-blur-xl"
              >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_#22c55e]"
                  >
                      <CheckCircle size={40} className="text-black" />
                  </motion.div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Order Secured</h2>
                  <p className="text-neutral-400 font-mono text-sm mb-8">
                      Your acquisition has been logged in the archive. <br/>
                      Order ID: #PAL-{Math.floor(Math.random() * 100000)}
                  </p>
                  <Link to="/" className="inline-block bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                      Return to Base
                  </Link>
              </motion.div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-6 lg:px-12 flex flex-col lg:flex-row gap-12 max-w-[1600px] mx-auto">
      
      {/* Left: Form Terminal */}
      <div className="flex-1">
         <div className="flex items-center gap-4 mb-8">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-500'}`}>1</div>
             <div className={`h-[1px] w-12 bg-neutral-800`} />
             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-500'}`}>2</div>
         </div>

         <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-xl">
            {step === 1 ? (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-6">Shipping Manifest</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">First Name</label>
                            <input className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-white transition-colors outline-none" placeholder="ENTER NAME" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">Last Name</label>
                            <input className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-white transition-colors outline-none" placeholder="ENTER SURNAME" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">Address Line 1</label>
                            <input className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-white transition-colors outline-none" placeholder="STREET ADDRESS" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">City</label>
                            <input className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-white transition-colors outline-none" placeholder="CITY" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">Postal Code</label>
                            <input className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-white transition-colors outline-none" placeholder="ZIP CODE" />
                        </div>
                    </div>
                    <button onClick={() => setStep(2)} className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 mt-4">
                        Proceed to Payment
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-6">Secure Payment</h2>
                    
                    <div className="bg-gradient-to-br from-neutral-800 to-black p-6 rounded-xl border border-white/10 relative overflow-hidden mb-8">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><CreditCard size={120} /></div>
                        <p className="text-neutral-400 font-mono text-xs mb-8">ENCRYPTED TRANSACTION</p>
                        <div className="space-y-4 relative z-10">
                            <input className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-mono text-white placeholder-white/20 focus:border-white outline-none" placeholder="0000 0000 0000 0000" />
                            <div className="flex gap-4">
                                <input className="w-24 bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 focus:border-white outline-none font-mono" placeholder="MM/YY" />
                                <input className="w-24 bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 focus:border-white outline-none font-mono" placeholder="CVC" />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-3 disabled:bg-neutral-800 disabled:text-neutral-500"
                    >
                        {isProcessing ? (
                            <>
                                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                PROCESSING PROTOCOL...
                            </>
                        ) : (
                            <>
                                <Lock size={16} /> AUTHORIZE ${total.toFixed(2)}
                            </>
                        )}
                    </button>
                    <button onClick={() => setStep(1)} className="w-full text-neutral-500 text-xs uppercase tracking-widest hover:text-white mt-4">Back to Shipping</button>
                </div>
            )}
         </div>
      </div>

      {/* Right: Order Summary */}
      <div className="w-full lg:w-[400px]">
         <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-xl sticky top-32">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Order Summary</h3>
             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto no-scrollbar">
                 {cart.map((item, i) => (
                     <div key={i} className="flex gap-4">
                         <div className="w-16 h-20 bg-neutral-800 rounded overflow-hidden">
                             <img src={item.image} className="w-full h-full object-cover opacity-80" />
                         </div>
                         <div>
                             <p className="text-white text-xs font-bold uppercase">{item.name}</p>
                             <p className="text-neutral-500 text-[10px] font-mono">{item.category} // QTY: {item.quantity}</p>
                             <p className="text-neutral-300 text-sm font-mono mt-1">${item.price}</p>
                         </div>
                     </div>
                 ))}
             </div>
             
             <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                 <div className="flex justify-between text-neutral-400">
                     <span>Subtotal</span>
                     <span>${total.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-neutral-400">
                     <span>Shipping</span>
                     <span className="text-green-500">FREE</span>
                 </div>
                 <div className="flex justify-between text-white font-black text-xl pt-4">
                     <span>TOTAL</span>
                     <span>${total.toFixed(2)}</span>
                 </div>
             </div>

             <div className="mt-8 flex items-center gap-3 text-[10px] text-neutral-500 uppercase tracking-widest justify-center">
                 <ShieldCheck size={14} />
                 <span>Secure Checkout</span>
             </div>
         </div>
      </div>

    </div>
  );
};
