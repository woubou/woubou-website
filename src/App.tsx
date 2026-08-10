import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ERPSpotlight } from './components/ERPSpotlight';
import { Team } from './components/Team';
import { FAQ } from './components/FAQ';
import { ContactFooter } from './components/ContactFooter';
import { ERPTestDriveModal } from './components/ERPTestDriveModal';

export const AppContent: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [testDriveOpen, setTestDriveOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] dark:bg-[#0f172a] dark:text-[#f8fafc] font-inter transition-colors duration-300 antialiased selection:bg-[#026177] selection:text-white">
      {/* Navigation Header */}
      <Header
        theme={theme}
        setTheme={setTheme}
        onOpenTestDrive={() => setTestDriveOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* Main Page Flow */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenContact={scrollToContact}
        />

        {/* Services Section */}
        <Services onOpenContact={scrollToContact} />

        {/* A concise introduction to Woubou ERP; details stay in the modal. */}
        <ERPSpotlight onOpenERP={() => setTestDriveOpen(true)} />

        {/* Team Section */}
        <Team />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Contact Banner & Footer */}
      <ContactFooter />

      {/* Full-Screen ERP Sandbox Modal */}
      <ERPTestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        onOpenContact={scrollToContact}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
