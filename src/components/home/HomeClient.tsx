"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sun, Leaf, Shield } from 'lucide-react';
import Image from 'next/image';
import { SITE_IMAGES, SITE_STATS } from '@/config/constants';

interface Testimonial {
  documentId: string;
  clientName: string;
  projectType: string;
  quote: string;
}

export default function HomeClient({ testimonials = [] }: { testimonials?: Testimonial[] }) {
  const t = useTranslations('HomePage');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={SITE_IMAGES.hero} 
            alt="Hero Background" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center space-y-6 max-w-4xl px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all">
              {t('hero.ctaPrimary')}
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all">
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold">{t('features.title')}</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-zinc-700" {...fadeIn} transition={{ delay: 0.1 }}>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 flex items-center justify-center rounded-xl mb-6">
                <Sun className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('features.items.savings.title')}</h3>
              <p className="text-muted-foreground">{t('features.items.savings.description')}</p>
            </motion.div>

            <motion.div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-zinc-700" {...fadeIn} transition={{ delay: 0.2 }}>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 flex items-center justify-center rounded-xl mb-6">
                <Leaf className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('features.items.eco.title')}</h3>
              <p className="text-muted-foreground">{t('features.items.eco.description')}</p>
            </motion.div>

            <motion.div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-zinc-700" {...fadeIn} transition={{ delay: 0.3 }}>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 flex items-center justify-center rounded-xl mb-6">
                <Shield className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('features.items.support.title')}</h3>
              <p className="text-muted-foreground">{t('features.items.support.description')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold">{t('services.title')}</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer" {...fadeIn} transition={{ delay: 0.1 }}>
              <div className="relative h-64 overflow-hidden">
                <Image src={SITE_IMAGES.services.residential} alt="Residential Solar" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">{t('services.residential.title')}</h3>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-800">
                <p className="text-muted-foreground">{t('services.residential.description')}</p>
              </div>
            </motion.div>

            <motion.div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer" {...fadeIn} transition={{ delay: 0.2 }}>
              <div className="relative h-64 overflow-hidden">
                <Image src={SITE_IMAGES.services.commercial} alt="Commercial Solar" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">{t('services.commercial.title')}</h3>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-800">
                <p className="text-muted-foreground">{t('services.commercial.description')}</p>
              </div>
            </motion.div>

            <motion.div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer" {...fadeIn} transition={{ delay: 0.3 }}>
              <div className="relative h-64 overflow-hidden">
                <Image src={SITE_IMAGES.services.waterHeater} alt="Solar Water Heater" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">{t('services.waterHeater.title')}</h3>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-800">
                <p className="text-muted-foreground">{t('services.waterHeater.description')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {SITE_STATS.map((stat, i) => (
              <motion.div key={stat.id} {...fadeIn} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl md:text-5xl font-extrabold mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-emerald-100 font-medium">
                  {t(stat.translationKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-16" {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold">{t('testimonials.title')}</h2>
              <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div key={testimonial.documentId} className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col" {...fadeIn} transition={{ delay: i * 0.1 }}>
                  <div className="mb-6 flex-grow">
                    <p className="text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.clientName}</h4>
                    <p className="text-muted-foreground">{testimonial.projectType}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-xl text-muted-foreground mb-10">
              {t('cta.subtitle')}
            </p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all">
              {t('cta.button')}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
