"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Career {
  documentId: string;
  title: string;
  location: string;
  employmentType: string;
  description: string;
}

export default function CareersClient({ careers = [] }: { careers: Career[] }) {
  const t = useTranslations('CareersPage');
  const locale = useLocale();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            {t('title', { fallback: 'Join Our Mission' })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle', { fallback: 'Help us accelerate the world’s transition to sustainable energy.' })}
          </p>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-8 rounded-full" />
        </motion.div>

        {careers.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800">
            <h3 className="text-2xl font-semibold mb-3">No Open Positions</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're not actively hiring right now, but we're always looking for talented individuals. Follow us for future opportunities.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {careers.map((career, index) => (
              <motion.div 
                key={career.documentId} 
                className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-start md:items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex-grow space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold px-3 py-1 rounded-full text-sm capitalize">
                      {career.employmentType.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold">{career.title}</h2>
                  
                  <div className="flex flex-wrap gap-4 text-muted-foreground text-sm font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {career.location}
                    </div>
                    <div className="flex items-center gap-1.5 capitalize">
                      <Clock className="w-4 h-4" /> {career.employmentType.replace('-', ' ')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" /> Kayvi Solar
                    </div>
                  </div>

                  {career.description && (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground mt-4 line-clamp-3">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {career.description}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                
                <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                  <Button size="lg" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-full group">
                    {locale === 'hi' ? 'आवेदन करें' : locale === 'gu' ? 'અરજી કરો' : 'Apply Now'}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
