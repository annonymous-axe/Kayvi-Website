"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  documentId: string;
  title: string;
  description: string;
  status?: string;
  coverImage?: {
    url: string;
  };
}

export default function GalleryClient({ projects = [] }: { projects: Project[] }) {
  const t = useTranslations('GalleryPage');
  const locale = useLocale();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Filter out projects without images for the gallery
  const galleryItems = projects.filter(p => p.coverImage);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {t('title', { fallback: 'Our Gallery' })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle', { fallback: 'Browse our portfolio of high-quality solar installations.' })}
          </p>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {galleryItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">No images available</h3>
            <p className="text-muted-foreground">We are updating our portfolio. Please check back soon!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {galleryItems.map((item, i) => (
              <motion.div 
                key={item.documentId} 
                className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-sm hover:shadow-xl transition-all cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: i % 3 === 0 ? '4/5' : i % 2 === 0 ? '1/1' : '3/4' }}>
                  <div className="absolute top-3 right-3 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-500/90 text-white shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    {item.status || (locale === 'hi' ? 'आगामी' : locale === 'gu' ? 'આગામી' : 'Upcoming')}
                  </div>
                  <Image 
                    src={item.coverImage!.url.startsWith('http') ? item.coverImage!.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${item.coverImage!.url}`} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
