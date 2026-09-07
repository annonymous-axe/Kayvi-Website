import { getTranslations } from 'next-intl/server';
import HomeClient from '@/components/home/HomeClient';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_TESTIMONIALS } from '@/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'HomePage' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle')
  };
}

export default async function HomePage() {
  let testimonials = [];
  try {
    const data = await fetchGraphQL<{ testimonials: any[] }>(GET_TESTIMONIALS);
    testimonials = data?.testimonials || [];
  } catch (error) {
    console.error("Failed to fetch testimonials from CMS, using fallback.");
  }

  return <HomeClient testimonials={testimonials} />;
}
