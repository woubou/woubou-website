import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

interface HeaderProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  onOpenTestDrive: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  onOpenTestDrive,
  onOpenContact
}) => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const navLinks = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.team, href: '#team' },
    { name: t.nav.faq, href: '#faq' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'h-16 bg-[#faf8ff]/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-[#026177]/15 dark:border-white/10 shadow-sm'
          : 'h-20 bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center">
          <Logo size="lg" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 font-inter text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#3f484c] dark:text-slate-300 hover:text-[#004859] dark:hover:text-[#8ad0ea] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#b52703] dark:after:bg-[#fc5935] after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onOpenTestDrive}
            className="text-[#3f484c] dark:text-slate-300 hover:text-[#004859] dark:hover:text-[#8ad0ea] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#b52703] dark:after:bg-[#fc5935] after:transition-all hover:after:w-full cursor-pointer"
          >
            {t.nav.erp}
          </button>
        </nav>

        {/* Action Controls & Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher (FR / EN) */}
          <div className="flex items-center bg-[#eaedff] dark:bg-slate-800/80 p-0.5 rounded-lg border border-[#026177]/15 dark:border-white/10 text-xs font-mono-caps">
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'fr'
                  ? 'bg-[#026177] text-white font-bold shadow-sm'
                  : 'text-[#3f484c] dark:text-slate-300 hover:text-[#026177]'
              }`}
              title="Passer en Français"
            >
              FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'en'
                  ? 'bg-[#026177] text-white font-bold shadow-sm'
                  : 'text-[#3f484c] dark:text-slate-300 hover:text-[#026177]'
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Theme Toggle (Light / Dark) */}
          {/* <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3f484c] dark:text-slate-200 hover:bg-[#eaedff] dark:hover:bg-white/10 transition-all border border-transparent hover:border-[#026177]/20 dark:hover:border-white/20"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button> */}

          {/* Direct Link to Live Woubou ERP */}
          {/* <a
            href="https://erp.woubou.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-emerald-600 dark:bg-emerald-700 text-white font-mono-caps text-xs tracking-wider hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all shadow-sm active:scale-95"
            title="Open erp.woubou.com in new tab"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            {t.nav.liveErpLink}
          </a> */}

          {/* ERP Sandbox Button */}
          {/* <button
            onClick={onOpenTestDrive}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#026177] text-white font-mono-caps text-xs tracking-wider hover:bg-[#004859] transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            {t.nav.sandbox}
          </button> */}

          {/* Primary CTA Contact Us */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#b52703] text-white font-mono-caps text-xs tracking-wider uppercase hover:bg-[#fc5935] transition-all active:scale-95 shadow-[0_4px_14px_0_rgba(181,39,3,0.3)] cursor-pointer"
          >
            {t.nav.contact}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#3f484c] dark:text-slate-200 hover:bg-[#eaedff] dark:hover:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8ff] dark:bg-[#0f172a] border-b border-[#026177]/15 dark:border-white/10 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#026177]/10 dark:border-white/10">
            <span className="font-mono-caps text-xs text-[#6f787c] dark:text-slate-400">
              Language / Langue:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded font-mono-caps text-xs ${
                  lang === 'fr' ? 'bg-[#026177] text-white font-bold' : 'bg-black/5 dark:bg-white/10 text-slate-300'
                }`}
              >
                Français (FR)
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded font-mono-caps text-xs ${
                  lang === 'en' ? 'bg-[#026177] text-white font-bold' : 'bg-black/5 dark:bg-white/10 text-slate-300'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 font-inter text-base">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#131b2e] dark:text-slate-200 hover:text-[#004859] dark:hover:text-[#8ad0ea] font-medium py-2 border-b border-[#026177]/5 dark:border-white/5"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestDrive();
              }}
              className="text-left text-[#131b2e] dark:text-slate-200 hover:text-[#004859] dark:hover:text-[#8ad0ea] font-medium py-2 border-b border-[#026177]/5 dark:border-white/5"
            >
              {t.nav.erp}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center px-4 py-3 rounded-md bg-[#b52703] text-white font-mono-caps text-xs tracking-wider uppercase shadow-md"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
