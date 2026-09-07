"use client";

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';

interface FAQ {
  documentId: string;
  question: string;
  answer: string;
}

export default function FaqClient({ faqs = [] }: { faqs: FAQ[] }) {
  const t = useTranslations('FaqPage');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {t('title', { fallback: 'Frequently Asked Questions' })}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('subtitle', { fallback: 'Everything you need to know about switching to solar energy.' })}
          </p>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-zinc-800"
        >
          {faqs.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">No FAQs available at the moment.</p>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={faq.documentId} 
                  value={`item-${index}`} 
                  className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-6 py-2 rounded-xl"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-emerald-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </motion.div>
      </div>
    </div>
  );
}
