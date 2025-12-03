
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Truck, Package, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
           <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
             LOGISTICS <span className="text-red-600">COMMAND</span>
           </h1>
           <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
             Global Deployment Protocols // Active
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Left: Map Visualization */}
           <div className="lg:col-span-7 bg-neutral-900/30 border border-white/5 rounded-2xl p-8 relative overflow-hidden min-h-[500px] flex items-center justify-center">
              {/* World Map SVG Simulation */}
              <div className="absolute inset-0 opacity-20">
                 <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                       <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                 </svg>
              </div>
              
              {/* Gaza Pulse */}
              <div className="absolute top-1/2 left-1/2 md:left-[55%] md:top-[40%]">
                 <div className="relative">
                    <span className="w-4 h-4 bg-red-600 rounded-full absolute -top-2 -left-2 animate-ping opacity-75"></span>
                    <span className="w-2 h-2 bg-red-600 rounded-full absolute -top-1 -left-1"></span>
                    
                    {/* Connecting Lines */}
                    <svg className="absolute top-0 left-0 w-[500px] h-[500px] overflow-visible pointer-events-none" style={{ transform: "translate(0,0)" }}>
                       {/* Line to Europe */}
                       <motion.path 
                         d="M 0 0 L -100 -80" 
                         stroke="red" 
                         strokeWidth="1" 
                         fill="none" 
                         strokeDasharray="4 4"
                         initial={{ pathLength: 0 }}
                         animate={{ pathLength: 1 }}
                         transition={{ duration: 2, repeat: Infinity }}
                       />
                       {/* Line to USA */}
                       <motion.path 
                         d="M 0 0 L -250 -50" 
                         stroke="red" 
                         strokeWidth="1" 
                         fill="none" 
                         strokeDasharray="4 4"
                         initial={{ pathLength: 0 }}
                         animate={{ pathLength: 1 }}
                         transition={{ duration: 2.5, repeat: Infinity }}
                       />
                       {/* Line to Asia */}
                       <motion.path 
                         d="M 0 0 L 150 50" 
                         stroke="red" 
                         strokeWidth="1" 
                         fill="none" 
                         strokeDasharray="4 4"
                         initial={{ pathLength: 0 }}
                         animate={{ pathLength: 1 }}
                         transition={{ duration: 3, repeat: Infinity }}
                       />
                    </svg>
                 </div>
              </div>

              {/* Data Overlay */}
              <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-lg">
                 <div className="flex items-center gap-2 mb-2">
                    <Globe size={14} className="text-white" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Network Status</span>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between gap-8 text-[9px] font-mono text-neutral-400">
                       <span>EUROPE</span>
                       <span className="text-green-500">ONLINE</span>
                    </div>
                    <div className="flex justify-between gap-8 text-[9px] font-mono text-neutral-400">
                       <span>NORTH AMERICA</span>
                       <span className="text-green-500">ONLINE</span>
                    </div>
                    <div className="flex justify-between gap-8 text-[9px] font-mono text-neutral-400">
                       <span>MENA REGION</span>
                       <span className="text-yellow-500">RESTRICTED</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Info Accordion */}
           <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="bg-white/5 p-3 rounded h-fit"><Truck className="text-white" size={24} /></div>
                    <div>
                       <h3 className="text-white font-bold uppercase tracking-wider mb-2">Standard Shipping</h3>
                       <p className="text-neutral-400 text-sm leading-relaxed">
                          All orders are dispatched within 24-48 hours. International shipping times vary between 7-14 business days depending on customs clearance.
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="bg-white/5 p-3 rounded h-fit"><ShieldCheck className="text-white" size={24} /></div>
                    <div>
                       <h3 className="text-white font-bold uppercase tracking-wider mb-2">Customs & Duties</h3>
                       <p className="text-neutral-400 text-sm leading-relaxed">
                          We cover import duties for orders to USA and EU. For other regions, customers may be responsible for local customs fees upon delivery.
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="bg-white/5 p-3 rounded h-fit"><Package className="text-white" size={24} /></div>
                    <div>
                       <h3 className="text-white font-bold uppercase tracking-wider mb-2">Packaging</h3>
                       <p className="text-neutral-400 text-sm leading-relaxed">
                          Every item is sealed in a tactical, weather-resistant polymer bag with a certificate of authenticity from Gaza.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-lg">
                 <h4 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                    <Clock size={14} /> Processing Delays
                 </h4>
                 <p className="text-neutral-400 text-xs">
                    Due to the current situation in the region, some shipments may experience slight delays. We appreciate your patience and solidarity.
                 </p>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
};
