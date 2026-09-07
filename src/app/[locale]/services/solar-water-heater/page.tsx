import { getTranslations } from 'next-intl/server';
import ServiceDetailClient from '@/components/services/ServiceDetailClient';
import { SITE_IMAGES } from '@/config/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'HomePage.services.waterHeater' });
  return { title: t('title'), description: t('description') };
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'HomePage.services.waterHeater' });
  const cta = await getTranslations({ locale: resolvedParams.locale, namespace: 'HomePage.cta' });
  
  return (
    <ServiceDetailClient 
      locale={resolvedParams.locale}
      title={t('title')}
      subtitle={t('description')}
      ctaText={cta('button')}
      imageSrc={SITE_IMAGES.services.waterHeater}
    />
  );
}
