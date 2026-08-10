import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'General', 'ERP', 'Custom Development', 'Support'];

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-mono-caps text-xs font-semibold text-[#b52703] dark:text-[#ffb4a3] tracking-widest uppercase">
            {t.faq.badge}
          </span>
          <h2 className="font-geist text-3xl sm:text-4xl font-bold text-[#004859] dark:text-white">
            {t.faq.title}
          </h2>
          <p className="font-inter text-base text-[#3f484c] dark:text-slate-300">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="relative max-w-lg mx-auto">
            <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#6f787c] text-xl">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#026177]/20 dark:border-white/15 text-sm text-[#131b2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#026177] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#6f787c] text-xs font-mono-caps cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-mono-caps text-xs transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#004859] text-white font-semibold shadow-sm'
                    : 'bg-[#eaedff]/60 dark:bg-white/5 text-[#3f484c] dark:text-slate-300 hover:bg-[#eaedff] dark:hover:bg-white/10'
                }`}
              >
                {cat === 'All' ? t.faq.allCategories : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-[#3f484c] dark:text-slate-400 font-inter">
              No matching questions found.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#ffffff] dark:bg-slate-900 border-[#026177]/30 dark:border-[#8ad0ea]/30 shadow-md'
                      : 'bg-[#ffffff]/70 dark:bg-slate-900/50 border-[#026177]/10 dark:border-white/10 hover:border-[#026177]/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-geist text-lg sm:text-xl font-semibold text-[#131b2e] dark:text-white cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`material-symbols-outlined text-2xl text-[#026177] dark:text-[#8ad0ea] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 font-inter text-sm sm:text-base text-[#3f484c] dark:text-slate-300 leading-relaxed border-t border-[#026177]/5 dark:border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
