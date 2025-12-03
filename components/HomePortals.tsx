
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PenTool, Sparkles, BookOpen, MoveRight } from 'lucide-react';

const Portals = [
  {
    id: 'studio',
    title: 'Custom Studio',
    subtitle: 'Tactical Design',
    link: '/custom-print',
    icon: PenTool,
    color: 'bg-red-600',
    video: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_24fps.mp4' // Abstract tech
  },
  {
    id: 'special',
    title: 'Special Archive',
    subtitle: 'Classified Art',
    link: '/special-designs',
    icon: Sparkles,
    color: 'bg-white',
    video: 'https://videos.pexels.com/video-files/5527814/5527814-uhd_2560_1440_25fps.mp4' // Dark moody
  },
  {
    id: 'story',
    title: 'Our Story',
    subtitle: 'The Protocol',
    link: '/about',
    icon: BookOpen,
    color: 'bg-green-600',
    video: 'https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4' // Smoke/Ink
  }
];

export const HomePortals: React.FC = () => {
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

  return (
    <section className="py-24 bg-neutral-50 dark:bg-black relative z-20">
        <div className="max-w-[1600px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] md:h-[500px]">
                {Portals.map((portal) => (
                    <Link 
                        key={portal.id}
                        to={portal.link}
                        onMouseEnter={() => setHoveredPortal(portal.id)}
                        onMouseLeave={() => setHoveredPortal(null)}
                        className="relative group overflow-hidden rounded-sm border border-neutral-200 dark:border-white/10 cursor-pointer"
                    >
                        {/* Video Background */}
                        <div className="absolute inset-0 bg-neutral-900">
                            <video 
                                src={portal.video} 
                                autoPlay muted loop playsInline 
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
                        </div>

                        {/* Kufiya Shutter - Slides away on hover */}
                        <motion.div 
                            initial={{ y: 0 }}
                            animate={{ y: hoveredPortal === portal.id ? '-100%' : '0%' }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 bg-neutral-100 dark:bg-black z-10 flex items-center justify-center border-b-2 border-red-600"
                        >
                            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Keffiyeh_pattern.svg/1200px-Keffiyeh_pattern.svg.png')] bg-repeat bg-[length:100px_100px]" />
                            <div className="text-center">
                                <portal.icon size={32} className="mx-auto mb-4 text-black dark:text-white" />
                                <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tighter">{portal.title}</h3>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2">{portal.subtitle}</p>
                            </div>
                        </motion.div>

                        {/* Revealed Content */}
                        <div className="absolute inset-0 z-0 flex flex-col justify-end p-8">
                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className={`w-12 h-1 ${portal.color} mb-4`} />
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">{portal.title}</h3>
                                <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
                                    <span>Enter Portal</span>
                                    <MoveRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
};
