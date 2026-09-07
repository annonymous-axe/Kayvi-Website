"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, CheckCircle2 } from 'lucide-react';

interface Certificate {
  documentId: string;
  title: string;
  issuedBy: string;
  issuedDate: string;
  image?: {
    url: string;
  };
}

export default function CertificatesClient({ certificates = [] }: { certificates: Certificate[] }) {
  const t = useTranslations('CertificatesPage');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full">
              <Award className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {t('title', { fallback: 'Our Certifications' })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle', { fallback: 'We hold ourselves to the highest industry standards for safety, quality, and environmental stewardship.' })}
          </p>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {certificates.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-800 rounded-3xl border border-gray-100 dark:border-zinc-700 shadow-sm">
            <h3 className="text-2xl font-semibold mb-2">No Certifications Uploaded</h3>
            <p className="text-muted-foreground">Check back soon to see our latest industry accreditations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => {
              const formattedDate = cert.issuedDate ? new Date(cert.issuedDate).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long'
              }) : null;

              return (
                <motion.div 
                  key={cert.documentId} 
                  className="bg-white dark:bg-zinc-800 rounded-3xl p-8 border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-xl transition-shadow flex flex-col md:flex-row gap-8 items-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-full md:w-1/3 shrink-0">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700 flex items-center justify-center p-4">
                      {cert.image ? (
                        <Image 
                          src={cert.image.url.startsWith('http') ? cert.image.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${cert.image.url}`} 
                          alt={cert.title} 
                          fill 
                          className="object-contain p-4" 
                        />
                      ) : (
                        <Award className="w-16 h-16 text-emerald-200 dark:text-emerald-900/50" />
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 space-y-3 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Verified
                    </div>
                    <h3 className="text-2xl font-bold">{cert.title}</h3>
                    <p className="text-lg text-muted-foreground font-medium">{cert.issuedBy}</p>
                    {formattedDate && (
                      <p className="text-sm text-muted-foreground">Issued: {formattedDate}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
