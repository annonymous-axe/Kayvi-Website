"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle, Phone, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { Faq, getStaticFaqs } from '@/lib/staticData';

interface FaqSectionProps {
  locale?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  showCategories?: boolean;
  className?: string;
}

export default function FaqSection({
  locale = 'en',
  title,
  subtitle,
  badge,
  showCategories = true,
  className = '',
}: FaqSectionProps) {
  const t = useTranslations('FaqPage');
  const allFaqs: Faq[] = getStaticFaqs(locale);

  // Active open item documentIds - supports multiple open items or single item accordion
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['f-1']));
  const [activeCategory, setActiveCategory] = useState<'all' | 'savings' | 'installation' | 'technology'>('all');

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filter by category if selected
  const displayedFaqs = allFaqs.filter((faq) => {
    if (activeCategory === 'all') return true;
    return faq.category === activeCategory;
  });

  // Split into 2 balanced columns matching the screenshot layout
  const midPoint = Math.ceil(displayedFaqs.length / 2);
  const leftColumnFaqs = displayedFaqs.slice(0, midPoint);
  const rightColumnFaqs = displayedFaqs.slice(midPoint);

  const categories = [
    { id: 'all', label: t('categories.all', { fallback: 'All Questions' }) },
    { id: 'savings', label: t('categories.savings', { fallback: 'Savings & Subsidies' }) },
    { id: 'installation', label: t('categories.installation', { fallback: 'Terrace & Installation' }) },
    { id: 'technology', label: t('categories.technology', { fallback: 'Quality & Warranties' }) },
  ];

  const renderFaqItem = (faq: Faq) => {
    const isOpen = openIds.has(faq.documentId);

    return (
      <div
        key={faq.documentId}
        className="border-b border-gray-200/80 dark:border-zinc-800 transition-colors"
      >
        <button
          type="button"
          onClick={() => toggleItem(faq.documentId)}
          className="w-full py-5 flex items-center justify-between text-left gap-4 group focus:outline-none"
          aria-expanded={isOpen}
        >
          <span className="text-base md:text-[17px] font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
            {faq.question}
          </span>
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
              isOpen
                ? 'bg-emerald-600 text-white rotate-45 shadow-sm'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 group-hover:bg-gray-200 dark:group-hover:bg-zinc-700'
            }`}
            aria-hidden="true"
          >
            <Plus className="w-4 h-4 transition-transform duration-300" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pb-5 pt-1 text-sm md:text-base text-muted-foreground leading-relaxed pr-6">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className={`py-20 md:py-28 bg-white dark:bg-zinc-950 relative overflow-hidden ${className}`}>
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              {title || t('title', { fallback: 'Frequently Asked Questions' })}
            </h2>

            {/* Subtitle Badge Pill matching the screenshot */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white dark:bg-zinc-800 text-xs md:text-sm font-semibold tracking-wide shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{badge || t('badge', { fallback: 'All your questions, answered.' })}</span>
            </div>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {subtitle ||
                t('subtitle', {
                  fallback:
                    'Everything you need to know about switching to rooftop solar, PM Surya Ghar subsidy, terrace requirements, and savings in Surat & Gujarat.',
                })}
            </p>
          </motion.div>

          {/* Optional Category Pills */}
          {showCategories && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-gray-100 dark:border-zinc-800/80"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-gray-100 dark:bg-zinc-800/80 text-muted-foreground hover:text-foreground hover:bg-gray-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* 2-Column FAQ Layout Matching Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 gap-y-1">
          {/* Left Column */}
          <div className="flex flex-col">
            {leftColumnFaqs.map((faq) => renderFaqItem(faq))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {rightColumnFaqs.map((faq) => renderFaqItem(faq))}
          </div>
        </div>

        {/* Still Have Questions Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-900 border border-emerald-200/60 dark:border-zinc-800 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                {t('stillHaveQuestions', { fallback: 'Still have questions about going solar?' })}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                {t('contactPrompt', {
                  fallback:
                    'Our solar engineering team in Surat is here to inspect your terrace, calculate your savings, and manage all government subsidies.',
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>{t('talkToExpert', { fallback: 'Talk to an Expert' })}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700/80 text-foreground transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{t('callUs', { fallback: `Call ${siteConfig.phone}` })}</span>
            </a>

            {siteConfig.whatsappNumber && (
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Hello Kayvi Solar, I have a few questions about rooftop solar installation in Surat.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3.5 rounded-2xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 transition-all duration-200"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
