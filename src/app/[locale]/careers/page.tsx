import { getTranslations } from 'next-intl/server';
import CareersClient from '@/components/careers/CareersClient';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_CAREERS } from '@/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'CareersPage' });
  return {
    title: t('title', { fallback: 'Careers at Kayvi Solar' }),
    description: t('subtitle', { fallback: 'Join our team and help build a sustainable future.' })
  };
}

export default async function CareersPage() {
  let careers = [];
  try {
    const data = await fetchGraphQL<{ careerListings: any[] }>(GET_CAREERS);
    careers = data?.careerListings || [];
  } catch (error) {
    console.error("Failed to fetch careers");
  }

  return <CareersClient careers={careers} />;
}
