"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

export default function AboutClient() {
  const t = useTranslations('AboutPage');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const members = ['m1', 'm2', 'm3'];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-24 px-4 text-center">
        <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">{t('hero.title')}</h1>
          <p className="text-xl text-emerald-100">{t('hero.subtitle')}</p>
        </motion.div>
      </section>

      {/* Story & Mission */}
      <section className="py-24 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold mb-6 text-emerald-600">{t('story.title')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('story.content')}
            </p>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-bold mb-6 text-emerald-600">{t('mission.title')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('mission.content')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold">{t('team.title')}</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {members.map((m, i) => (
              <motion.div key={m} {...fadeIn} transition={{ delay: i * 0.1 }}>
                <Card className="text-center hover:shadow-xl transition-shadow border-none bg-white dark:bg-zinc-800">
                  <CardContent className="pt-10 pb-8">
                    <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/30 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                      <User className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{t(`team.members.${m}.name`)}</h3>
                    <p className="text-emerald-600 font-medium">{t(`team.members.${m}.role`)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
