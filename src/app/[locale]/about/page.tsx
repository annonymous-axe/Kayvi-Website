import { getTranslations } from 'next-intl/server';
import AboutClient from '@/components/about/AboutClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'AboutPage' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle')
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
