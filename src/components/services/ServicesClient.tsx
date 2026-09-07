"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_IMAGES } from '@/config/constants';

interface Project {
  documentId: string;
  title: string;
  description: string;
  coverImage?: {
    url: string;
  };
}

export default function ServicesClient({ projects = [] }: { projects?: Project[] }) {
  const t = useTranslations('ServicesPage');
  const locale = useLocale();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      id: 'residential',
      title: 'Residential Solar',
      desc: 'Power your home with clean energy and increase your property value with our custom roof installations.',
      image: SITE_IMAGES.services.residential,
      href: `/${locale}/services/residential-solar`
    },
    {
      id: 'commercial',
      title: 'Commercial Solar',
      desc: 'Reduce operating costs and demonstrate environmental leadership with scalable energy systems.',
      image: SITE_IMAGES.services.commercial,
      href: `/${locale}/services/commercial-solar`
    },
    {
      id: 'waterHeater',
      title: 'Solar Water Heaters',
      desc: 'Enjoy hot water year-round while significantly reducing your energy consumption with advanced systems.',
      image: SITE_IMAGES.services.waterHeater,
      href: `/${locale}/services/solar-water-heater`
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-emerald-600 text-white py-24 px-4 text-center">
        <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">{t('hero.title')}</h1>
          <p className="text-xl text-emerald-100">{t('hero.subtitle')}</p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
                {...fadeIn} 
                transition={{ delay: 0.1 }}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-80 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  <p className="text-lg text-muted-foreground">{service.desc}</p>
                  <Button 
                    size="lg" 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    render={<Link href={service.href} />}
                    nativeButton={false}
                  >
                    {t('cta')}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="py-24 px-4 bg-gray-50 dark:bg-zinc-900">
          <div className="container mx-auto">
            <motion.div className="text-center mb-16" {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
              <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div key={project.documentId} className="group rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-zinc-800" {...fadeIn} transition={{ delay: i * 0.1 }}>
                  <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                    {project.coverImage ? (
                      <Image 
                        src={project.coverImage.url.startsWith('http') ? project.coverImage.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${project.coverImage.url}`} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <span className="text-emerald-600 font-medium">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
