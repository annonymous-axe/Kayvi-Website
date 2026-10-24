import { getTranslations } from 'next-intl/server';
import ServicesClient from '@/components/services/ServicesClient';
import { staticProjects } from '@/lib/staticData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'ServicesPage' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle')
  };
}

export default async function ServicesPage() {
  return <ServicesClient projects={staticProjects} />;
}

