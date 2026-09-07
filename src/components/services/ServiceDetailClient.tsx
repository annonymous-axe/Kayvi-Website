"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ServiceDetailClient({
  title,
  subtitle,
  imageSrc,
  locale,
  ctaText
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
  locale: string;
  ctaText: string;
}) {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={imageSrc} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <motion.div className="relative z-10 text-center space-y-6 max-w-3xl px-4" {...fadeIn}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">{title}</h1>
          <p className="text-xl text-gray-200">{subtitle}</p>
          <Button 
            size="lg" 
            className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white"
            render={<Link href={`/${locale}/contact`} />}
            nativeButton={false}
          >
            {ctaText}
          </Button>
        </motion.div>
      </section>

      <section className="py-24 px-4 bg-gray-50 dark:bg-zinc-900">
         <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Service details coming soon.</h2>
            <p className="text-muted-foreground text-lg">
              This page will be dynamically populated with detailed content from the Strapi CMS in Phase 6.
            </p>
         </div>
      </section>
    </div>
  );
}
