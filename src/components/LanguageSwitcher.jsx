import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function LanguageSwitcher() {
  const { lang, setLanguage, t, LANGUAGES } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors duration-150"
        aria-label={t('language')}
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline text-xs font-semibold">{current.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 min-w-[160px]"
          >
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => { setLanguage(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                  lang === l.code ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="flex-1 text-left">{l.label}</span>
                {lang === l.code && <Check className="w-3.5 h-3.5 text-orange-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
