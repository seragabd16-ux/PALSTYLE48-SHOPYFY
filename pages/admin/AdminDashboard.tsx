
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Product, AnalyticsData } from '../../types';
import { Plus, Trash2, Edit2, TrendingUp, Package, DollarSign, Video, Zap, Activity, Globe, MessageSquare, Instagram, ShoppingBag, Radio, Copy, Users, Truck, RefreshCw, AlertCircle, Check, CircuitBoard, Terminal, Send, Power, Mail, Smartphone, Layers, Upload, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { generateProductDescription, generateBrandVideo } from '../../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { GeminiTerminal } from '../../components/GeminiTerminal';

const MOCK_ANALYTICS: AnalyticsData[] = [
  { name: 'Jan', sales: 40, revenue: 2400 },
  { name: 'Feb', sales: 30, revenue: 1398 },
  { name: 'Mar', sales: 20, revenue: 9800 },
  { name: 'Apr', sales: 27, revenue: 3908 },
  { name: 'May', sales: 18, revenue: 4800 },
  { name: 'Jun', sales: 23, revenue: 3800 },
  { name: 'Jul', sales: 34, revenue: 4300 },
];

// --- ISOLATED SUB-COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, view, activeView, setView }: { icon: any, label: string, view: string, activeView: string, setView: (v: any) => void }) => (
  <button 
    onClick={() => setView(view)}
    className={`w-full p-4 flex items-center gap-4 transition-all duration-300 border-l-2 relative overflow-hidden group ${
      activeView === view 
        ? 'border-red-600 bg-neutral-100 dark:bg-white/5 text-black dark:text-white' 
        : 'border-transparent text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
    }`}
  >
    <Icon size={18} className={`relative z-10 transition-colors ${activeView === view ? "text-red-500" : "group-hover:text-black dark:group-hover:text-white"}`} />
    <span className="text-xs font-bold uppercase tracking-widest relative z-10">{label}</span>
    {activeView === view && <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-red-600/5 z-0" />}
  </button>
);

const OmniChannelNexus = () => {
    const { orders, products, isSyncing, syncData, whatsAppTemplates } = useStore();
    
    return (
      <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Trendyol Node */}
              <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/5 p-6 rounded-lg relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                  <div className="flex justify-between items-start mb-8">
                      <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500"><ShoppingBag size={24} /></div>
                      <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-ping' : 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]'}`} />
                          <span className="text-[10px] font-bold text-green-500 uppercase">{isSyncing ? 'SYNCING...' : 'LIVE CONNECTED'}</span>
                      </div>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-1">Trendyol</h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">Bridge ID: 1158243</p>
                  <div className="flex gap-4 text-xs font-mono text-neutral-400">
                      <div><span className="text-black dark:text-white">{orders.filter(o => o.platform === 'Trendyol').length}</span> Orders</div>
                      <div className="text-orange-500 font-bold">{products.length} Active SKUs</div>
                  </div>
              </div>

              {/* Shopify Node */}
              <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/5 p-6 rounded-lg relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#95BF47]" /> {/* Shopify Green */}
                  <div className="flex justify-between items-start mb-8">
                      <div className="p-3 bg-[#95BF47]/10 rounded-lg text-[#95BF47]"><Globe size={24} /></div>
                      <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-ping' : 'bg-[#95BF47] animate-pulse shadow-[0_0_8px_#95BF47]'}`} />
                          <span className="text-[10px] font-bold text-[#95BF47] uppercase">{isSyncing ? 'SYNCING...' : 'LIVE CONNECTED'}</span>
                      </div>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-1">Shopify</h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">Key: 11115f48...</p>
                  <div className="flex gap-4 text-xs font-mono text-neutral-400">
                      <div><span className="text-black dark:text-white">{orders.filter(o => o.platform === 'Shopify').length}</span> Orders</div>
                      <div className="text-[#95BF47] font-bold">{products.length} Active SKUs</div>
                  </div>
              </div>

              {/* Meta / WhatsApp Node */}
              <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/5 p-6 rounded-lg relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#25D366]" /> {/* WhatsApp Green */}
                  <div className="flex justify-between items-start mb-8">
                      <div className="p-3 bg-[#25D366]/10 rounded-lg text-[#25D366]"><MessageSquare size={24} /></div>
                      <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-ping' : 'bg-[#25D366] animate-pulse shadow-[0_0_8px_#25D366]'}`} />
                          <span className="text-[10px] font-bold text-[#25D366] uppercase">{isSyncing ? 'SYNCING...' : 'LIVE CONNECTED'}</span>
                      </div>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-1">Meta Business</h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">API: v18.0 // WA-BIZ</p>
                  <div className="flex gap-4 text-xs font-mono text-neutral-400">
                      <div><span className="text-black dark:text-white">{whatsAppTemplates.length}</span> Templates</div>
                      <div className="text-[#25D366] font-bold">Automation Active</div>
                  </div>
              </div>
          </div>
          
          <button onClick={syncData} disabled={isSyncing} className="w-full py-4 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 text-black dark:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-3">
               <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
               {isSyncing ? 'Running Global Sync Protocol...' : 'Execute Full Synchronization'}
          </button>
      </div>
    );
};

const AutomationView = () => {
    const { automationRules, automationLogs, toggleAutomationRule } = useStore();

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* Rules List */}
          <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                  <CircuitBoard size={20} className="text-red-600" />
                  <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-wider">Active Protocols</h3>
              </div>
              
              <div className="grid gap-4">
                  {automationRules.map((rule) => (
                      <div key={rule.id} className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/5 p-6 rounded-lg flex items-center justify-between group hover:border-neutral-300 dark:hover:border-white/20 transition-all shadow-sm">
                          <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-md ${
                                  rule.type === 'WHATSAPP' ? 'bg-green-500/10 text-green-500' :
                                  rule.type === 'EMAIL' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
                              }`}>
                                  {rule.type === 'WHATSAPP' ? <MessageSquare size={20} /> : rule.type === 'EMAIL' ? <Mail size={20} /> : <AlertCircle size={20} />}
                              </div>
                              <div>
                                  <h4 className="text-black dark:text-white font-bold text-sm uppercase tracking-wide">{rule.name}</h4>
                                  <p className="text-neutral-500 text-[10px] font-mono mt-1">TRIGGER: {rule.trigger} // ID: {rule.id}</p>
                                  <div className="mt-3 flex gap-4 text-[9px] font-mono text-neutral-400">
                                      <span>EXECUTED: {rule.stats.executed}</span>
                                      <span>SUCCESS: {rule.stats.successRate}%</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-3">
                              <button 
                                  onClick={() => toggleAutomationRule(rule.id)}
                                  className={`w-12 h-6 rounded-full p-1 transition-colors ${rule.isActive ? 'bg-green-600' : 'bg-neutral-300 dark:bg-neutral-700'}`}
                              >
                                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${rule.isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                              </button>
                              <span className={`text-[9px] font-bold uppercase tracking-widest ${rule.isActive ? 'text-green-500' : 'text-neutral-500'}`}>
                                  {rule.isActive ? 'ONLINE' : 'OFFLINE'}
                              </span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Live Terminal */}
          <div className="lg:col-span-4 flex flex-col h-[500px]">
              <div className="flex items-center gap-3 mb-4">
                  <Terminal size={20} className="text-black dark:text-white" />
                  <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-wider">System Log</h3>
              </div>
              <div className="flex-1 bg-neutral-900 dark:bg-black border border-neutral-800 dark:border-white/10 rounded-lg p-4 font-mono text-[10px] overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
                      {automationLogs.length === 0 && <span className="text-neutral-600">// Waiting for events...</span>}
                      <AnimatePresence>
                          {automationLogs.map((log) => (
                              <motion.div 
                                  key={log.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="flex gap-2"
                              >
                                  <span className="text-neutral-500">[{log.timestamp}]</span>
                                  <span className={
                                      log.action.includes('WHATSAPP') ? 'text-green-500' : 
                                      log.action.includes('EMAIL') ? 'text-blue-500' : 'text-red-500'
                                  }>{log.action}</span>
                                  <span className="text-white">{log.details}</span>
                              </motion.div>
                          ))}
                      </AnimatePresence>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 dark:border-white/10 text-green-500 animate-pulse">
                      _ curs_active
                  </div>
              </div>
          </div>
      </div>
    );
};

const MarketingStudio = () => {
    const { whatsAppTemplates, sendWhatsAppCampaign } = useStore();
    const [marketingTab, setMarketingTab] = useState<'social' | 'product' | 'whatsapp'>('social');
    const [captionPrompt, setCaptionPrompt] = useState("");
    const [mProdName, setMProdName] = useState('');
    const [mProdCategory, setMProdCategory] = useState('Hoodies');
    const [marketingOutput, setMarketingOutput] = useState('');
    const [isMarketingGenerating, setIsMarketingGenerating] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [targetSegment, setTargetSegment] = useState('VIP');

    const handleMarketingAction = async () => {
        setIsMarketingGenerating(true);
        if (marketingTab === 'social') {
            setTimeout(() => {
                setMarketingOutput("Shadows align. The new protocol has begun. Wear the silence. \n\n#Palstyle48 #DarkLuxury #Streetwear");
                setIsMarketingGenerating(false);
            }, 1500);
        } else if (marketingTab === 'product') {
            if (!mProdName) {
                 setIsMarketingGenerating(false);
                 return;
            }
            const desc = await generateProductDescription(mProdName, mProdCategory);
            setMarketingOutput(desc);
            setIsMarketingGenerating(false);
        } else if (marketingTab === 'whatsapp') {
            // Send Broadcast
            await sendWhatsAppCampaign(selectedTemplate, targetSegment);
            setMarketingOutput("Campaign Dispatched via Meta API.");
            setIsMarketingGenerating(false);
        }
    };

    return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Input Control */}
        <div className="space-y-6">
            <div className="flex bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-lg p-1">
                <button 
                    onClick={() => setMarketingTab('social')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${marketingTab === 'social' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-neutral-500 hover:text-black dark:hover:text-white'}`}
                >
                    Social
                </button>
                <button 
                    onClick={() => setMarketingTab('product')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${marketingTab === 'product' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-neutral-500 hover:text-black dark:hover:text-white'}`}
                >
                    Copy
                </button>
                <button 
                    onClick={() => setMarketingTab('whatsapp')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${marketingTab === 'whatsapp' ? 'bg-green-600 text-white' : 'text-neutral-500 hover:text-black dark:hover:text-white'}`}
                >
                    WhatsApp
                </button>
            </div>

            <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 p-6 rounded-lg space-y-4">
                {marketingTab === 'social' && (
                    <div>
                         <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">Campaign Goal / Vibe</label>
                         <textarea 
                            value={captionPrompt}
                            onChange={(e) => setCaptionPrompt(e.target.value)}
                            placeholder="e.g., Dark aesthetic launch post for new hoodie drop..."
                            className="w-full h-32 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 text-black dark:text-white text-sm focus:border-red-600 transition-colors outline-none resize-none"
                         />
                    </div>
                )}
                
                {marketingTab === 'product' && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">Product Name</label>
                            <input 
                                value={mProdName}
                                onChange={(e) => setMProdName(e.target.value)}
                                className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 text-black dark:text-white text-sm focus:border-black dark:focus:border-white transition-colors outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">Category</label>
                            <select 
                                value={mProdCategory}
                                onChange={(e) => setMProdCategory(e.target.value)}
                                className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 text-black dark:text-white text-sm focus:border-black dark:focus:border-white transition-colors outline-none"
                            >
                                <option value="Hoodies">Hoodies</option>
                                <option value="T-Shirts">T-Shirts</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    </div>
                )}

                {marketingTab === 'whatsapp' && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">Select Template</label>
                            <div className="space-y-2">
                                {whatsAppTemplates.map(t => (
                                    <div 
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t.id)}
                                        className={`p-3 border rounded cursor-pointer transition-colors flex justify-between items-center ${selectedTemplate === t.id ? 'border-green-500 bg-green-500/10' : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'}`}
                                    >
                                        <div>
                                            <p className="text-black dark:text-white text-sm font-bold">{t.name}</p>
                                            <p className="text-neutral-500 text-[10px]">{t.category}</p>
                                        </div>
                                        {selectedTemplate === t.id && <Check size={14} className="text-green-500" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">Target Audience</label>
                            <select 
                                value={targetSegment}
                                onChange={(e) => setTargetSegment(e.target.value)}
                                className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 text-black dark:text-white text-sm focus:border-green-500 transition-colors outline-none"
                            >
                                <option value="VIP">VIP Customers (Spent > $500)</option>
                                <option value="ALL">All Subscribers</option>
                                <option value="CART">Abandoned Carts</option>
                            </select>
                        </div>
                    </div>
                )}

                <button 
                    onClick={handleMarketingAction}
                    disabled={isMarketingGenerating}
                    className={`w-full text-white py-4 font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${marketingTab === 'whatsapp' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                    {isMarketingGenerating ? <span className="animate-spin">⟳</span> : marketingTab === 'whatsapp' ? <Send size={16} /> : <Zap size={16} />}
                    {isMarketingGenerating ? 'PROCESSING...' : marketingTab === 'whatsapp' ? 'BROADCAST CAMPAIGN' : 'GENERATE CONTENT'}
                </button>
            </div>
        </div>

        {/* Output Console */}
        <div className="bg-neutral-900 dark:bg-black border border-white/10 rounded-lg p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
                <Copy size={16} className="text-neutral-500 hover:text-white cursor-pointer" />
            </div>
            <h3 className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-4">Output Terminal</h3>
            <div className="flex-1 font-mono text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                {marketingOutput || <span className="text-neutral-700">// System ready. Awaiting input coordinates...</span>}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] uppercase text-neutral-500">
                    <div className={`w-2 h-2 rounded-full ${marketingOutput ? 'bg-green-500' : 'bg-neutral-700'}`} />
                    Status: {marketingOutput ? 'Generated' : 'Idle'}
                </div>
                <span className="text-[10px] text-neutral-700">GEMINI-2.5 / META-API</span>
            </div>
        </div>
    </div>
    );
};

const UnifiedInbox = () => {
    const [selectedMsg, setSelectedMsg] = useState<number | null>(null);
    const messages = [
        { id: 1, user: "Sarah Connor", platform: "instagram", preview: "Is the black hoodie back in stock?", time: "2m ago", read: false },
        { id: 2, user: "+90 555 123 4567", platform: "whatsapp", preview: "Order #72839 status update please.", time: "15m ago", read: true },
        { id: 3, user: "support@shopify.com", platform: "email", preview: "Chargeback dispute resolved.", time: "1h ago", read: true },
        { id: 4, user: "Ahmed K.", platform: "instagram", preview: "Love the new collection! Shipping to Egypt?", time: "3h ago", read: true },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
            {/* Message List */}
            <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/5 rounded-lg overflow-hidden flex flex-col">
                <div className="p-4 border-b border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900/50">
                    <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-widest">Incoming Signals</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id}
                            onClick={() => setSelectedMsg(msg.id)}
                            className={`p-4 border-b border-neutral-100 dark:border-white/5 cursor-pointer hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors ${selectedMsg === msg.id ? 'bg-neutral-100 dark:bg-white/10' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    {msg.platform === 'instagram' ? <Instagram size={12} className="text-black dark:text-white" /> : msg.platform === 'whatsapp' ? <MessageSquare size={12} className="text-black dark:text-white" /> : <Mail size={12} className="text-black dark:text-white" />}
                                    <span className={`text-sm font-bold ${!msg.read ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>{msg.user}</span>
                                </div>
                                <span className="text-[10px] text-neutral-500 dark:text-neutral-600">{msg.time}</span>
                            </div>
                            <p className="text-xs text-neutral-500 truncate">{msg.preview}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-lg flex flex-col relative">
                {selectedMsg ? (
                    <>
                        <div className="p-6 border-b border-neutral-200 dark:border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-bold">
                                    {messages.find(m => m.id === selectedMsg)?.user.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-black dark:text-white font-bold">{messages.find(m => m.id === selectedMsg)?.user}</h3>
                                    <span className="text-xs text-neutral-500 uppercase tracking-wider">Via {messages.find(m => m.id === selectedMsg)?.platform}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-full text-neutral-400"><Trash2 size={16}/></button>
                                <button className="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-full text-neutral-400"><AlertCircle size={16}/></button>
                            </div>
                        </div>
                        <div className="flex-1 p-8">
                             <div className="flex gap-4 mb-6">
                                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex-shrink-0" />
                                <div className="bg-white dark:bg-neutral-900 p-4 rounded-r-xl rounded-bl-xl text-sm text-black dark:text-neutral-300 leading-relaxed max-w-lg shadow-sm border border-neutral-100 dark:border-transparent">
                                    {messages.find(m => m.id === selectedMsg)?.preview}
                                    <br/><br/>
                                    Can you help me with this?
                                </div>
                             </div>
                        </div>
                        <div className="p-4 border-t border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900/30">
                            <div className="relative">
                                <input className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-full pl-6 pr-12 py-4 text-sm text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none" placeholder="Type your response..." />
                                <button className="absolute right-2 top-2 p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600">
                        <MessageSquare size={48} className="mb-4 opacity-20" />
                        <p className="text-xs uppercase tracking-widest">Select a transmission to decrypt</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export const AdminDashboard: React.FC = () => {
  const { 
      products, addProduct, deleteProduct, updateProduct, importProducts, isAdmin, setHeroVideoUrl, 
      dashboardView, setDashboardView, orders, customers, syncData, isSyncing,
      whatsAppTemplates, fetchWhatsAppTemplates
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', price: 0, category: 'Hoodies', description: '', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState("");
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isRegeneratingAll, setIsRegeneratingAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-Sync on Mount
  useEffect(() => {
    if (orders.length === 0 && !isSyncing) {
        syncData();
    }
    if (whatsAppTemplates.length === 0) {
        fetchWhatsAppTemplates();
    }
  }, []);

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-4xl font-black mb-4 tracking-tighter">ACCESS DENIED</h1>
        <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">Protocol Protection Enabled</p>
      </div>
    );
  }

  // --- HANDLERS ---

  const handleGenerateDescription = async () => {
    if (!newProduct.name || !newProduct.category) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.category);
    setNewProduct(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleRegenerateAll = async () => {
    if (confirm("This will overwrite all product descriptions with AI-generated content. Proceed?")) {
        setIsRegeneratingAll(true);
        const updates = products.map(async (p) => {
            const desc = await generateProductDescription(p.name, p.category);
            updateProduct(p.id, { description: desc });
        });
        await Promise.all(updates);
        setIsRegeneratingAll(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt) return;
    setIsGeneratingVideo(true);
    const videoUrl = await generateBrandVideo(videoPrompt);
    if (videoUrl) {
        setHeroVideoUrl(videoUrl);
        setIsVideoModalOpen(false);
    }
    setIsGeneratingVideo(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      addProduct({
        id: Math.random().toString(36).substr(2, 9),
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category || 'General',
        description: newProduct.description || 'No description',
        image: newProduct.image || '',
        stock: 100
      } as Product);
      setIsModalOpen(false);
      setNewProduct({ name: '', price: 0, category: 'Hoodies', description: '', image: '' });
    }
  };

  const exportToCSV = () => {
    const headers = ['Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 'Tags', 'Published', 'Option1 Name', 'Option1 Value', 'Variant SKU', 'Variant Grams', 'Variant Inventory Tracker', 'Variant Inventory Qty', 'Variant Price', 'Image Src'];
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + products.map(p => {
          return [
              p.id, 
              `"${p.name.replace(/"/g, '""')}"`, 
              `"${p.description.replace(/"/g, '""')}"`, 
              "Palstyle", 
              "Apparel", 
              p.category, 
              "dark-luxury", 
              "TRUE", 
              "Size", 
              "M", 
              p.id, 
              "500", 
              "shopify", 
              p.stock, 
              p.price,
              p.image
          ].join(",");
      }).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "palstyle_products_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Robust CSV Parser (State Machine)
  const parseCSVLine = (text: string) => {
    const result = [];
    let cell = '';
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(cell);
            cell = '';
        } else {
            cell += char;
        }
    }
    result.push(cell);
    return result.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target?.result as string;
        if (!text) return;

        // Clean Parsing
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const newProducts: Product[] = [];

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const cleanRow = parseCSVLine(lines[i]);
            
            // Map known columns to Product fields
            const titleIdx = headers.indexOf('Title');
            const bodyIdx = headers.indexOf('Body (HTML)');
            const priceIdx = headers.indexOf('Variant Price');
            const stockIdx = headers.indexOf('Variant Inventory Qty');
            const imageIdx = headers.indexOf('Image Src');
            const catIdx = headers.indexOf('Product Category') !== -1 ? headers.indexOf('Product Category') : headers.indexOf('Type');
            const handleIdx = headers.indexOf('Handle');

            if (titleIdx !== -1 && priceIdx !== -1) {
                newProducts.push({
                    id: handleIdx !== -1 && cleanRow[handleIdx] ? cleanRow[handleIdx] : Math.random().toString(36).substr(2, 9),
                    name: cleanRow[titleIdx] || 'Imported Product',
                    description: bodyIdx !== -1 ? cleanRow[bodyIdx]?.replace(/<[^>]*>?/gm, '') : 'Imported via CSV', // Strip HTML
                    price: parseFloat(cleanRow[priceIdx]) || 0,
                    stock: parseInt(cleanRow[stockIdx]) || 0,
                    category: catIdx !== -1 ? cleanRow[catIdx] : 'General',
                    image: imageIdx !== -1 ? cleanRow[imageIdx] : 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000'
                });
            }
        }

        if (newProducts.length > 0) {
            importProducts(newProducts);
            alert(`Import Successful! ${newProducts.length} products added to inventory.`);
        } else {
            alert("Failed to parse CSV. Please ensure standard Shopify export format.");
        }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col md:flex-row gap-0 max-w-[1600px] mx-auto transition-colors duration-500">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white dark:bg-black border-r border-neutral-200 dark:border-white/5 flex flex-col h-[calc(100vh-8rem)] sticky top-24 transition-colors duration-500">
        <div className="p-6 border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Command Center</h2>
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-ping' : 'bg-green-500 animate-pulse'}`} />
                <span className="text-black dark:text-white font-bold tracking-tight">{isSyncing ? 'SYNCING DATA' : 'SYSTEM ONLINE'}</span>
            </div>
        </div>
        
        <div className="flex-1 py-6 space-y-1">
          <SidebarItem icon={Activity} label="Overview" view="overview" activeView={dashboardView} setView={setDashboardView} />
          <SidebarItem icon={Globe} label="Channels" view="omni" activeView={dashboardView} setView={setDashboardView} />
          <SidebarItem icon={CircuitBoard} label="Automation" view="automation" activeView={dashboardView} setView={setDashboardView} />
          <SidebarItem icon={Truck} label="Orders" view="orders" activeView={dashboardView} setView={setDashboardView} />
          <SidebarItem icon={Users} label="Customers" view="customers" activeView={dashboardView} setView={setDashboardView} />
          <SidebarItem icon={Instagram} label="Marketing" view="marketing" activeView={dashboardView} setView={setDashboardView} />
          <SidebarItem icon={MessageSquare} label="Inbox" view="inbox" activeView={dashboardView} setView={setDashboardView} />
        </div>

        <div className="p-6 border-t border-neutral-200 dark:border-white/5 space-y-2">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".csv" 
                className="hidden" 
            />
            <div className="grid grid-cols-2 gap-2">
                <button 
                    onClick={handleImportClick}
                    className="w-full py-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded flex items-center justify-center gap-2 transition-colors text-[9px] font-bold uppercase tracking-widest"
                >
                    <Upload size={14} /> Import
                </button>
                <button 
                    onClick={exportToCSV}
                    className="w-full py-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded flex items-center justify-center gap-2 transition-colors text-[9px] font-bold uppercase tracking-widest"
                >
                    <Download size={14} /> Export
                </button>
            </div>
            
            <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full py-3 bg-red-50 hover:bg-red-100 dark:bg-red-600/10 dark:hover:bg-red-600/20 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-600/20 rounded flex items-center justify-center gap-2 transition-colors"
            >
                <Video size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">VEO STUDIO</span>
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-white dark:bg-black p-8 min-h-[calc(100vh-8rem)] transition-colors duration-500">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-8 border-b border-neutral-200 dark:border-white/5">
            <div>
                <h1 className="text-3xl font-black text-black dark:text-white tracking-tighter uppercase mb-1">
                    {dashboardView === 'omni' ? 'OMNI-CHANNEL' : 
                     dashboardView === 'marketing' ? 'MARKETING AI' : 
                     dashboardView === 'inbox' ? 'UNIFIED INBOX' : 
                     dashboardView === 'orders' ? 'ORDER COMMAND' :
                     dashboardView === 'customers' ? 'CUSTOMER DATABASE' :
                     dashboardView === 'automation' ? 'NEURAL AUTOMATION' :
                     'DASHBOARD OVERVIEW'}
                </h1>
                <div className="flex items-center gap-2 text-neutral-500 text-[10px] uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-500">Trendyol</span> • <span className="text-[#95BF47]">Shopify</span> • <span className="text-[#25D366]">Meta</span>
                </div>
            </div>
            
            <div className="flex gap-4">
                <button 
                    onClick={syncData}
                    className="group relative px-6 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-black dark:text-white font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center gap-2"
                >
                    <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} /> Sync
                </button>
                <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="group relative px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-black tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300"
                >
                    <div className="relative z-10 flex items-center gap-2">
                        <Video size={16} /> <span>Video Gen</span>
                    </div>
                </button>
            </div>
        </div>

        {dashboardView === 'overview' && (
            <div className="space-y-12 animate-fade-in">
                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-900/30 p-6 border border-neutral-200 dark:border-white/5 rounded-lg">
                        <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-2">Total Revenue</p>
                        <h3 className="text-3xl font-black text-black dark:text-white">${orders.reduce((acc, o) => acc + o.total, 0) + 24500}</h3>
                        <span className="text-green-500 text-xs font-mono">+12% vs last week</span>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-900/30 p-6 border border-neutral-200 dark:border-white/5 rounded-lg">
                        <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-2">Active Orders</p>
                        <h3 className="text-3xl font-black text-black dark:text-white">{orders.length + 142}</h3>
                        <div className="flex gap-3 text-xs font-mono">
                            <span className="text-orange-500">TY: {orders.filter(o => o.platform === 'Trendyol').length}</span>
                            <span className="text-[#95BF47]">SH: {orders.filter(o => o.platform === 'Shopify').length}</span>
                        </div>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-900/30 p-6 border border-neutral-200 dark:border-white/5 rounded-lg">
                        <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-2">Avg. Order Value</p>
                        <h3 className="text-3xl font-black text-black dark:text-white">$85.00</h3>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-900/30 p-6 border border-neutral-200 dark:border-white/5 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/5 dark:bg-red-900/10" />
                        <p className="text-red-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Low Stock Alert</p>
                        <h3 className="text-3xl font-black text-black dark:text-white">{products.filter(p => p.stock < 20).length}</h3>
                        <span className="text-red-400 text-xs font-mono">SKUs critical</span>
                    </div>
                </div>

                {/* Main Chart */}
                <div className="bg-neutral-50 dark:bg-neutral-900/20 p-8 rounded-xl border border-neutral-200 dark:border-white/5">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-6">Performance</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_ANALYTICS}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.1} />
                        <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#dc2626" fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Inventory Table */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-black dark:text-white">Live Inventory</h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleImportClick}
                            className="bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
                        >
                            <Upload size={16} /> IMPORT DATA
                        </button>
                        <button 
                            onClick={handleRegenerateAll}
                            disabled={isRegeneratingAll}
                            className="bg-neutral-900 text-white dark:bg-white dark:text-black border border-neutral-800 dark:border-neutral-200 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-2 disabled:opacity-50"
                        >
                            <Zap size={16} className={isRegeneratingAll ? "animate-spin" : ""} /> 
                            {isRegeneratingAll ? 'REWRITING...' : 'AI REWRITE ALL'}
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
                        >
                            <Plus size={16} /> Add Product
                        </button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
                      <thead className="bg-neutral-50 dark:bg-neutral-900/80 text-xs uppercase font-bold text-neutral-500">
                        <tr>
                          <th className="p-6">Product</th>
                          <th className="p-6">Category</th>
                          <th className="p-6">Price</th>
                          <th className="p-6">Stock</th>
                          <th className="p-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-white/5">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                            <td className="p-6 flex items-center gap-4">
                              <img src={product.image} className="w-12 h-12 object-cover rounded bg-neutral-200 dark:bg-neutral-800 grayscale group-hover:grayscale-0 transition-all" />
                              <div>
                                  <span className="text-black dark:text-white font-medium group-hover:text-red-500 transition-colors block">{product.name}</span>
                                  <span className="text-[10px] text-neutral-500 line-clamp-1 max-w-[200px]">{product.description}</span>
                              </div>
                            </td>
                            <td className="p-6">{product.category}</td>
                            <td className="p-6 font-mono text-black dark:text-white">${product.price}</td>
                            <td className="p-6">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${product.stock < 20 ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-500' : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-500'}`}>
                                    {product.stock} UNITS
                                </span>
                            </td>
                            <td className="p-6 text-right space-x-4">
                              <button className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"><Edit2 size={16} /></button>
                              <button onClick={() => deleteProduct(product.id)} className="text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        )}

        {dashboardView === 'omni' && <div className="animate-fade-in"><OmniChannelNexus /></div>}
        {dashboardView === 'orders' && <div className="animate-fade-in"><div className="flex justify-between items-center mb-6"><div className="flex items-center gap-3"><Truck size={20} className="text-red-600" /><h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-wider">Order Command</h3></div><button onClick={syncData} className="flex items-center gap-2 text-[10px] uppercase font-bold text-neutral-400 hover:text-black dark:hover:text-white transition-colors"><RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} /> Refresh Data</button></div><div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm"><table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400"><thead className="bg-neutral-50 dark:bg-neutral-900/80 text-xs uppercase font-bold text-neutral-500"><tr><th className="p-6">Order ID</th><th className="p-6">Customer</th><th className="p-6">Platform</th><th className="p-6">Date</th><th className="p-6">Status</th><th className="p-6 text-right">Total</th></tr></thead><tbody className="divide-y divide-neutral-100 dark:divide-white/5">{orders.map((order) => (<tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"><td className="p-6 font-mono text-black dark:text-white">{order.orderNumber}</td><td className="p-6">{order.customer}</td><td className="p-6"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${order.platform === 'Trendyol' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-500 border border-orange-200 dark:border-orange-900/50' : order.platform === 'Shopify' ? 'bg-[#95BF47]/20 text-[#95BF47] border border-[#95BF47]/50' : 'bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-white'}`}>{order.platform}</span></td><td className="p-6 font-mono text-xs">{order.date}</td><td className="p-6"><span className={`flex items-center gap-2 ${order.status === 'Pending' ? 'text-yellow-500' : order.status === 'Shipped' ? 'text-blue-500' : order.status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}><span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Pending' ? 'bg-yellow-500 animate-pulse' : order.status === 'Shipped' ? 'bg-blue-500' : order.status === 'Delivered' ? 'bg-green-500' : 'bg-red-500'}`} />{order.status}</span></td><td className="p-6 text-right font-mono text-black dark:text-white font-bold">${order.total}</td></tr>))}{orders.length === 0 && (<tr><td colSpan={6} className="p-12 text-center text-neutral-600 uppercase tracking-widest text-xs">No active signals found</td></tr>)}</tbody></table></div></div>}
        {dashboardView === 'customers' && <div className="animate-fade-in"><div className="flex items-center gap-3 mb-6"><Users size={20} className="text-red-600" /><h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-wider">VIP Ledger</h3></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{customers.map((cust) => (<div key={cust.id} className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/5 p-6 rounded-lg hover:border-neutral-300 dark:hover:border-white/20 transition-colors group shadow-sm"><div className="flex justify-between items-start mb-4"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-200 to-white dark:from-neutral-800 dark:to-black border border-neutral-200 dark:border-white/10 flex items-center justify-center text-black dark:text-white font-bold">{cust.name.charAt(0)}</div><span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${cust.status === 'VIP' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-500 border border-red-200 dark:border-red-900/50' : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'}`}>{cust.status}</span></div><h4 className="text-black dark:text-white font-bold text-lg mb-1">{cust.name}</h4><p className="text-neutral-500 text-xs mb-4">{cust.email}</p><div className="flex justify-between items-center pt-4 border-t border-neutral-100 dark:border-white/5"><div className="text-xs text-neutral-400">Last Active: <span className="text-black dark:text-white font-mono">{cust.lastOrderDate}</span></div><div className="text-right"><p className="text-[10px] text-neutral-500 uppercase tracking-widest">Total Value</p><p className="text-lg font-black text-black dark:text-white">${cust.totalSpent}</p></div></div></div>))}</div></div>}
        {dashboardView === 'automation' && <div className="animate-fade-in"><AutomationView /></div>}
        {dashboardView === 'marketing' && <div className="animate-fade-in"><MarketingStudio /></div>}
        {dashboardView === 'inbox' && <div className="animate-fade-in"><UnifiedInbox /></div>}

      </main>

      {/* GEMINI TERMINAL */}
      <GeminiTerminal />

      {/* PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 w-full max-w-lg p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Create Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                placeholder="Product Name" 
                className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none"
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  placeholder="Price" 
                  className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none"
                  value={newProduct.price || ''}
                  onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
                <select 
                  className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option value="Hoodies">Hoodies</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="relative">
                <textarea 
                    placeholder="Description" 
                    className="w-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none h-32"
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
                <button 
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="absolute bottom-4 right-4 text-[10px] bg-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-neutral-300 dark:border-white/20 px-3 py-1 rounded-full backdrop-blur-md transition-all flex items-center gap-1"
                >
                    {isGenerating ? <span className="animate-spin">⟳</span> : <Zap size={10} />}
                    {isGenerating ? 'GENERATING...' : 'AI GENERATE'}
                </button>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-neutral-500 hover:text-black dark:hover:text-white">Cancel</button>
                <button type="submit" className="flex-1 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest hover:opacity-80">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VEO VIDEO STUDIO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] flex items-center justify-center p-6">
             <div className="bg-neutral-900 border border-white/10 w-full max-w-xl p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-transparent to-red-600" />
                
                <h2 className="text-2xl font-black text-white mb-2 tracking-tighter">VEO STUDIO</h2>
                <p className="text-neutral-500 text-xs tracking-widest uppercase mb-8">Google Veo 3.1 // Generative Video Engine</p>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-white block mb-2">PROMPT ENGINEERING</label>
                        <button 
                            onClick={() => setVideoPrompt("High-end cinematic fashion commercial, dark luxury aesthetic, models wearing Palestinian heritage streetwear, oversize hoodies, dramatic shadows, slow motion, red laser lighting, 4k resolution, highly detailed texture, urban night atmosphere.")}
                            className="text-[10px] bg-white/5 border border-white/10 px-3 py-2 rounded text-neutral-400 hover:text-white mb-4 block w-full text-left transition-colors hover:bg-white/10"
                        >
                            + Use Preset: Dark Luxury Campaign (Pro)
                        </button>
                        <textarea 
                            value={videoPrompt}
                            onChange={(e) => setVideoPrompt(e.target.value)}
                            placeholder="Describe the cinematic shot (e.g., 'Slow motion model walking in rain at night, neon lights, 4k')..."
                            className="w-full h-32 bg-black border border-neutral-800 p-4 text-white text-sm focus:border-red-600 transition-colors outline-none"
                        />
                    </div>
                    
                    <button 
                        onClick={handleGenerateVideo}
                        disabled={isGeneratingVideo || !videoPrompt}
                        className="w-full bg-white text-black py-4 font-black tracking-[0.2em] uppercase hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                    >
                         {isGeneratingVideo ? (
                             <>
                                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                RENDERING SCENE...
                             </>
                         ) : (
                             <>
                                <Video size={18} /> GENERATE ASSET
                             </>
                         )}
                    </button>
                </div>

                <button 
                    onClick={() => setIsVideoModalOpen(false)}
                    className="absolute top-6 right-6 text-neutral-500 hover:text-white"
                >
                    <Trash2 size={20} className="rotate-45" />
                </button>
             </div>
        </div>
      )}
    </div>
  );
};
