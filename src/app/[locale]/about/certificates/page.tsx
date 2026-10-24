import { getTranslations } from 'next-intl/server';
import CertificatesClient from '@/components/about/CertificatesClient';
import { staticCertificates } from '@/lib/staticData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'CertificatesPage' });
  return {
    title: t('title', { fallback: 'Our Certifications' }),
    description: t('subtitle', { fallback: 'Recognized for excellence and compliance in solar energy.' })
  };
}

export default async function CertificatesPage() {
  return <CertificatesClient certificates={staticCertificates} />;
}

