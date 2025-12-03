
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Upload, Check, Loader, Shirt, AlertCircle, RotateCw, Move3d, Layers, ArrowUpRight, Scan, Maximize, Zap, MousePointer2, Crosshair, Grid, Cpu, Code2 } from 'lucide-react';

type ProductType = 'Hoodie' | 'Sweatshirt' | 'T-Shirt';
type ProductColor = 'Black' | 'White' | 'Olive';

const PRODUCT_IMAGES: Record<ProductType, Record<ProductColor, string>> = {
  'Hoodie': {
    'Black': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000',
    'White': 'https://plus.unsplash.com/premium_photo-1673356301535-2cc32a93946d?q=80&w=1000&grayscale',
    'Olive': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&sepia'
  },
  'Sweatshirt': {
    'Black': 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1000',
    'White': 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1000&grayscale',
    'Olive': 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1000&sepia'
  },
  'T-Shirt': {
    'Black': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000',
    'White': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&grayscale',
    'Olive': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&sepia'
  }
};

export const CustomPrintPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ProductType>('Hoodie');
  const [selectedColor, setSelectedColor] = useState<ProductColor>('Black');
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'schematic'>('standard');

  // 360 Rotation Logic
  const rotation = useMotionValue(0);
  // Adjusted spring for a slightly "heavier" luxury feel while remaining responsive
  const rotateY = useSpring(rotation, { stiffness: 50, damping: 30 });
  
  // Dynamic Lighting & Parallax
  const glossX = useTransform(rotateY, (r) => `${(r % 360) / 3}%`);
  const shadowOpacity = useTransform(rotateY, (r) => Math.abs(Math.sin((r * Math.PI) / 180)) * 0.5 + 0.5);
  
  // Reset rotation on change
  useEffect(() => {
    rotation.set(0);
  }, [selectedType, selectedColor]);

  const handleUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadedImage('https://cdn-icons-png.flaticon.com/512/3616/3616929.png'); 
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 overflow-hidden flex flex-col items-center">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-900/10 blur-[150px] rounded-full animate-pulse" />
         <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-neutral-900/50 blur-[150px] rounded-full" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 h-full">
        
        {/* LEFT: 3D VISUALIZER (Span 7) */}
        <div className="lg:col-span-7 flex flex-col">
            
            {/* Header */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                        TACTICAL <span className="text-red-600">STUDIO</span>
                    </h1>
                    <div className="hidden md:flex items-center gap-2 text-neutral-500 font-mono text-[10px] tracking-widest pb-2 mt-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        SYSTEM ONLINE
                    </div>
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex bg-neutral-900/80 border border-white/10 rounded-full p-1">
                    <button 
                       onClick={() => setViewMode('standard')}
                       className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${viewMode === 'standard' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                    >
                        <Move3d size={12} /> Standard
                    </button>
                    <button 
                       onClick={() => setViewMode('schematic')}
                       className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${viewMode === 'schematic' ? 'bg-red-600 text-white shadow-[0_0_10px_red]' : 'text-neutral-500 hover:text-white'}`}
                    >
                        <Cpu size={12} /> Schematic
                    </button>
                </div>
            </div>

            {/* The Stage */}
            <div className="flex-1 relative bg-neutral-900/20 border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center min-h-[500px] lg:min-h-[600px] group perspective-1000">
                
                {/* 1. Holographic Grid Floor */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${viewMode === 'schematic' ? 'opacity-40' : 'opacity-20'}`}>
                    <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                </div>

                {/* 2. Drag Layer - The Interaction Core */}
                <motion.div 
                    className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragElastic={0}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragMomentum={false}
                    onDrag={(event, info) => {
                        // Apply drag delta to rotation. Multiplier 0.5 gives a 1:1 feel on most screens.
                        rotation.set(rotation.get() + info.delta.x * 0.5);
                    }}
                    whileTap={{ cursor: "grabbing" }}
                />

                {/* 3. Creative Branding Elements (3D Space) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center preserve-3d">
                    
                    {/* A. Base Kinetic Text Ring */}
                    <motion.div 
                        style={{ rotateX: 70, rotateZ: rotateY }}
                        className="w-[600px] h-[600px] absolute flex items-center justify-center opacity-30"
                    >
                        <div className={`absolute inset-0 rounded-full border-2 border-dashed ${viewMode === 'schematic' ? 'border-green-500' : 'border-white/20'}`} />
                        {/* Text Path Simulation via rotation */}
                        <svg viewBox="0 0 300 300" className="w-full h-full animate-spin-slow">
                            <path id="textPath" d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" fill="transparent" />
                            <text className={`text-[8px] font-bold tracking-[0.5em] uppercase fill-current ${viewMode === 'schematic' ? 'text-green-500' : 'text-white'}`}>
                                <textPath href="#textPath">
                                    PALSTYLE // TACTICAL OPERATIONS // CUSTOM DIVISION // 2025 //
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>

                    {/* B. Floating Tech Pillar (Vertical) */}
                    <motion.div 
                        style={{ 
                            transform: "translateZ(100px) translateX(280px) rotateY(-20deg)",
                            opacity: useTransform(rotateY, r => 1 - Math.min(1, Math.abs((r % 360) / 180))) // Fades when rotated behind
                        }}
                        className="absolute right-20 h-64 w-12 hidden lg:flex flex-col gap-2 pointer-events-none"
                    >
                        <div className={`flex-1 border-r ${viewMode === 'schematic' ? 'border-green-500/50 bg-green-900/10' : 'border-red-500/50 bg-red-900/10'} backdrop-blur-md flex flex-col justify-between p-2`}>
                            <Code2 size={16} className={viewMode === 'schematic' ? 'text-green-500' : 'text-red-500'} />
                            <div className="space-y-2">
                                <div className={`w-1 h-8 ${viewMode === 'schematic' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <div className={`w-1 h-4 ${viewMode === 'schematic' ? 'bg-green-500/50' : 'bg-red-500/50'}`} />
                                <div className={`w-1 h-2 ${viewMode === 'schematic' ? 'bg-green-500/20' : 'bg-red-500/20'}`} />
                            </div>
                            <span className="text-[8px] font-mono text-white vertical-text tracking-widest opacity-70">
                                SYS.ANALYSIS
                            </span>
                        </div>
                    </motion.div>

                    {/* C. Orbiting Satellites */}
                    <motion.div 
                        style={{ rotateX: 75, rotateZ: useTransform(rotateY, r => -r * 1.5) }}
                        className={`w-[400px] h-[400px] rounded-full border border-dotted absolute ${viewMode === 'schematic' ? 'border-green-500/30' : 'border-white/10'}`}
                    />
                </div>

                {/* 4. HUD Overlays */}
                <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-none">
                    <Scan className={`w-5 h-5 ${viewMode === 'schematic' ? 'text-green-500 animate-pulse' : 'text-red-600'}`} />
                    <span className={`text-[10px] font-mono tracking-widest ${viewMode === 'schematic' ? 'text-green-500' : 'text-red-600'}`}>
                        {viewMode === 'schematic' ? 'BLUEPRINT_MODE // ANALYZING' : 'SC_01 // ACTIVE'}
                    </span>
                </div>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <RotateCw className="text-white w-3 h-3 animate-spin-slow" />
                    <span className="text-[9px] font-bold text-white tracking-[0.2em]">DRAG TO ROTATE 360°</span>
                </div>

                {/* 5. THE PRODUCT CHASSIS */}
                <motion.div 
                    style={{ rotateY: rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
                    className="relative w-[320px] md:w-[450px] aspect-[3/4] z-20 pointer-events-none"
                >
                    {/* Schematic Grid Overlay Box (The Cage) */}
                    <AnimatePresence>
                        {viewMode === 'schematic' && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                style={{ transform: "translateZ(50px)" }}
                                className="absolute -inset-10 z-30 pointer-events-none border border-green-500/30 rounded-3xl"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black px-2 text-[8px] text-green-500 font-mono">WIDTH: 45CM</div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black px-2 text-[8px] text-green-500 font-mono">HEIGHT: 70CM</div>
                                <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 bg-black px-2 text-[8px] text-green-500 font-mono">DEPTH</div>
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Shadow Blob */}
                    <motion.div 
                        style={{ opacity: shadowOpacity }}
                        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/80 blur-2xl rounded-[100%] transform rotateX(60deg)" 
                    />

                    {/* Main Image Container */}
                    <motion.div 
                        className={`w-full h-full relative rounded-xl overflow-hidden border transition-all duration-500 ${viewMode === 'schematic' ? 'border-green-500/30 bg-black' : 'border-white/5 bg-neutral-900'}`}
                        style={{ transform: "translateZ(20px)" }}
                    >
                        <img 
                            src={PRODUCT_IMAGES[selectedType][selectedColor]} 
                            alt="Chassis" 
                            className={`w-full h-full object-cover transition-all duration-500 ${viewMode === 'schematic' ? 'grayscale contrast-125 opacity-60' : ''}`}
                        />
                        
                        {/* Dynamic Gloss/Reflection */}
                        {viewMode === 'standard' && (
                            <motion.div 
                                style={{ x: glossX }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%] h-full mix-blend-overlay pointer-events-none"
                            />
                        )}

                        {/* Scanner Laser */}
                        <motion.div 
                            animate={{ top: ["0%", "120%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                            className={`absolute left-0 w-full h-[2px] shadow-[0_0_20px] z-30 opacity-50 ${viewMode === 'schematic' ? 'bg-green-500 shadow-green-500' : 'bg-red-500 shadow-red-500'}`}
                        >
                            <div className={`absolute top-0 left-0 w-full h-20 bg-gradient-to-t to-transparent ${viewMode === 'schematic' ? 'from-green-500/20' : 'from-red-500/20'}`} />
                        </motion.div>

                        {/* The Print Layer */}
                        {uploadedImage && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 z-40"
                            >
                                <img src={uploadedImage} className="w-full h-full object-contain drop-shadow-2xl mix-blend-hard-light" />
                                
                                {/* Tech Bounding Box */}
                                <div className={`absolute -inset-4 border border-dashed rounded-lg flex items-center justify-center opacity-50 ${viewMode === 'schematic' ? 'border-green-500/40' : 'border-white/40'}`}>
                                    <div className={`absolute -top-1 -left-1 w-2 h-2 border-t border-l ${viewMode === 'schematic' ? 'border-green-500' : 'border-red-500'}`} />
                                    <div className={`absolute -top-1 -right-1 w-2 h-2 border-t border-r ${viewMode === 'schematic' ? 'border-green-500' : 'border-red-500'}`} />
                                    <div className={`absolute -bottom-1 -left-1 w-2 h-2 border-b border-l ${viewMode === 'schematic' ? 'border-green-500' : 'border-red-500'}`} />
                                    <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b border-r ${viewMode === 'schematic' ? 'border-green-500' : 'border-red-500'}`} />
                                    <span className={`absolute -top-6 text-[8px] font-mono ${viewMode === 'schematic' ? 'text-green-500' : 'text-red-500'}`}>SIGIL_RENDERED</span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* 5. Floating AR Labels (Parallax) */}
                    <motion.div 
                        style={{ transform: "translateZ(60px) translateX(80%) translateY(-250%)" }}
                        className="absolute top-1/2 right-0 hidden md:flex items-center gap-3"
                    >
                        <div className={`h-[1px] w-12 ${viewMode === 'schematic' ? 'bg-green-600/50' : 'bg-red-600/50'}`} />
                        <div className={`backdrop-blur border px-3 py-2 rounded-sm ${viewMode === 'schematic' ? 'bg-green-900/20 border-green-500/30' : 'bg-black/80 border-white/10'}`}>
                            <p className="text-[8px] text-neutral-400 uppercase tracking-widest">Fabric Spec</p>
                            <p className={`text-[10px] font-bold ${viewMode === 'schematic' ? 'text-green-400' : 'text-white'}`}>HEAVYWEIGHT COTTON</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        style={{ transform: "translateZ(80px) translateX(-80%) translateY(200%)" }}
                        className="absolute bottom-1/2 left-0 hidden md:flex items-center gap-3 flex-row-reverse"
                    >
                        <div className={`h-[1px] w-12 ${viewMode === 'schematic' ? 'bg-green-600/50' : 'bg-white/30'}`} />
                        <div className={`backdrop-blur border px-3 py-2 rounded-sm text-right ${viewMode === 'schematic' ? 'bg-green-900/20 border-green-500/30' : 'bg-black/80 border-white/10'}`}>
                            <p className="text-[8px] text-neutral-400 uppercase tracking-widest">Fit Type</p>
                            <p className={`text-[10px] font-bold ${viewMode === 'schematic' ? 'text-green-400' : 'text-white'}`}>OVERSIZE / UNISEX</p>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>

        {/* RIGHT: COMMAND PANEL (Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            
            <div className="space-y-6">
                <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <span>01. Configuration</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                {/* Type Selection */}
                <div className="grid grid-cols-3 gap-3">
                    {(['Hoodie', 'Sweatshirt', 'T-Shirt'] as ProductType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`group relative h-20 border rounded-lg flex flex-col items-center justify-center transition-all overflow-hidden ${
                                selectedType === type 
                                ? 'bg-white text-black border-white' 
                                : 'bg-neutral-900/50 text-neutral-500 border-white/5 hover:border-white/20'
                            }`}
                        >
                            <Shirt size={20} strokeWidth={1.5} className="mb-2 relative z-10" />
                            <span className="text-[9px] font-bold uppercase tracking-wider relative z-10">{type}</span>
                            {selectedType === type && <div className="absolute inset-0 bg-neutral-200 z-0 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />}
                        </button>
                    ))}
                </div>

                {/* Color & Size */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-3">Camouflage</span>
                        <div className="flex gap-3">
                            {(['Black', 'White', 'Olive'] as ProductColor[]).map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all relative ${
                                        selectedColor === color ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                    style={{ backgroundColor: color === 'Olive' ? '#4b5320' : color.toLowerCase() }}
                                >
                                    {selectedColor === color && (
                                        <motion.div layoutId="check" className={color === 'White' ? 'text-black' : 'text-white'}>
                                            <Check size={16} strokeWidth={3} />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-3">Dimensions</span>
                        <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-10 h-10 border rounded-md text-xs font-bold transition-all ${
                                        selectedSize === size 
                                        ? 'bg-white text-black border-white' 
                                        : 'bg-transparent text-neutral-500 border-white/10 hover:border-white/30'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 pt-6">
                <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <span>02. Sigil Upload</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                {/* Upload Zone */}
                <div className={`relative border border-dashed rounded-xl p-8 transition-all duration-300 group cursor-pointer overflow-hidden ${
                    uploadedImage 
                    ? 'border-green-500/50 bg-green-900/5' 
                    : isUploading 
                        ? 'border-neutral-600 bg-neutral-900' 
                        : 'border-white/20 bg-black hover:border-red-500/50'
                }`}>
                    {!uploadedImage && !isUploading && (
                        <div className="flex flex-col items-center gap-4 text-center" onClick={handleUpload}>
                            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:border-red-500/50">
                                <Upload className="text-neutral-400 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-white uppercase tracking-wider mb-1">Drag & Drop Sigil</span>
                                <span className="text-[10px] text-neutral-500 font-mono">SUPPORTED: PNG, AI, JPG // MAX 50MB</span>
                            </div>
                        </div>
                    )}

                    {isUploading && (
                        <div className="flex flex-col items-center gap-4">
                            <Loader className="animate-spin text-red-600 w-8 h-8" />
                            <div className="w-full max-w-[200px] h-1 bg-neutral-800 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-red-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-mono text-red-500 animate-pulse uppercase">Encrypting Data...</span>
                        </div>
                    )}

                    {uploadedImage && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-black rounded-lg border border-white/10 p-2 relative">
                                    <img src={uploadedImage} className="w-full h-full object-contain" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase tracking-wider">Design_v01.png</p>
                                    <p className="text-[10px] text-green-500 flex items-center gap-1 font-mono mt-1"><Check size={10}/> RESOLUTION: HIGH</p>
                                </div>
                            </div>
                            <button onClick={() => setUploadedImage(null)} className="text-neutral-500 hover:text-white text-xs underline uppercase tracking-widest">Reset</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Total & Action */}
            <div className="pt-8 border-t border-white/10">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Estimated Cost</span>
                        <div className="flex items-start gap-1">
                            <span className="text-4xl font-black text-white tracking-tighter">$89</span>
                            <span className="text-lg font-bold text-neutral-500 mt-1">.00</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Production Time</span>
                        <span className="text-sm font-bold text-white">2-3 Business Days</span>
                    </div>
                </div>

                <button 
                    disabled={!uploadedImage}
                    className="w-full h-16 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-black tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 rounded-lg overflow-hidden relative group"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    {uploadedImage ? (
                        <>
                            <Zap size={20} className="fill-current" /> INITIALIZE FABRICATION
                        </>
                    ) : (
                        <>
                            <AlertCircle size={20} /> AWAITING SIGIL UPLOAD
                        </>
                    )}
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};
