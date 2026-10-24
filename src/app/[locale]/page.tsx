import { getTranslations } from 'next-intl/server';
import HomeClient from '@/components/home/HomeClient';
import { staticTestimonials } from '@/lib/staticData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'HomePage' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle')
  };
}

export default async function HomePage() {
  return <HomeClient testimonials={staticTestimonials} />;
}

