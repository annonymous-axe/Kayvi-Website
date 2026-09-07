import { getTranslations } from 'next-intl/server';
import CertificatesClient from '@/components/about/CertificatesClient';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_CERTIFICATES } from '@/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'CertificatesPage' });
  return {
    title: t('title', { fallback: 'Our Certifications' }),
    description: t('subtitle', { fallback: 'Recognized for excellence and compliance in solar energy.' })
  };
}

export default async function CertificatesPage() {
  let certificates = [];
  try {
    const data = await fetchGraphQL<{ certificates: any[] }>(GET_CERTIFICATES);
    certificates = data?.certificates || [];
  } catch (error) {
    console.error("Failed to fetch certificates");
  }

  return <CertificatesClient certificates={certificates} />;
}
