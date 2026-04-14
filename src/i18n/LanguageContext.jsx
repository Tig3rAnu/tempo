import React, { createContext, useContext, useState, useCallback } from 'react';
import translations, { LANGUAGES } from './translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('shiksha_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = useCallback((code) => {
    setLang(code);
    try {
      localStorage.setItem('shiksha_lang', code);
    } catch {}
    // Set dir for RTL languages
    if (code === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, []);

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
