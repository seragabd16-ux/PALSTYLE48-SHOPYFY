
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, MinusSquare, Maximize2, Sparkles } from 'lucide-react';
import { streamGeminiResponse } from '../services/geminiService';

export const GeminiTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
      { role: 'ai', text: 'Director Terminal Online. Awaiting command.' }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsStreaming(true);

    let currentAIResponse = '';
    
    // Add placeholder for streaming
    setMessages(prev => [...prev, { role: 'ai', text: '' }]);

    await streamGeminiResponse(userMsg, (chunk) => {
        currentAIResponse += chunk;
        setMessages(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = { role: 'ai', text: currentAIResponse };
            return newHistory;
        });
    });

    setIsStreaming(false);
  };

  if (!isOpen) {
      return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-2xl flex items-center justify-center border border-white/10 dark:border-black/10"
          >
              <Sparkles size={24} className="animate-pulse" />
          </motion.button>
      );
  }

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isMinimized ? 'w-72 h-12' : 'w-96 h-[500px]'}`}>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
            {/* Header */}
            <div 
                className="h-12 bg-neutral-900/50 border-b border-white/10 flex items-center justify-between px-4 cursor-pointer"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-green-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Director AI // V3.0</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                    {isMinimized ? <Maximize2 size={12} /> : <MinusSquare size={12} />}
                    <X size={14} onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:text-red-500" />
                </div>
            </div>

            {/* Body */}
            {!isMinimized && (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar font-mono text-xs">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-lg ${
                                    msg.role === 'user' 
                                    ? 'bg-white text-black rounded-tr-none' 
                                    : 'bg-white/10 text-neutral-300 rounded-tl-none border-l-2 border-green-500'
                                }`}>
                                    {msg.text}
                                    {isStreaming && idx === messages.length - 1 && <span className="animate-pulse">_</span>}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black">
                        <div className="relative">
                            <input 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Input strategic query..."
                                className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-3 text-xs text-white focus:border-green-500 outline-none pr-10"
                            />
                            <button 
                                type="submit" 
                                disabled={isStreaming}
                                className="absolute right-2 top-2 p-1 text-neutral-400 hover:text-white"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </form>
                </>
            )}
        </motion.div>
    </div>
  );
};