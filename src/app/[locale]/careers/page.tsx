import { getTranslations } from 'next-intl/server';
import CareersClient from '@/components/careers/CareersClient';
import { staticCareers } from '@/lib/staticData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'CareersPage' });
  return {
    title: t('title', { fallback: 'Careers at Kayvi Solar' }),
    description: t('subtitle', { fallback: 'Join our team and help build a sustainable future.' })
  };
}

export default async function CareersPage() {
  return <CareersClient careers={staticCareers} />;
}

