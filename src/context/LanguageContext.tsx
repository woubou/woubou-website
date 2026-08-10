import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations } from '../i18n/translations';

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('woubou_lang') as Language;
    return saved === 'en' || saved === 'fr' ? saved : 'fr'; // default French as requested by user
  });

  useEffect(() => {
    localStorage.setItem('woubou_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
