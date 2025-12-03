
import React from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useStore();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'tr', label: 'TR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <div className="flex items-center gap-2 bg-neutral-900/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all duration-300 ${
            language === lang.code 
              ? 'bg-white text-black' 
              : 'text-neutral-500 hover:text-white'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
