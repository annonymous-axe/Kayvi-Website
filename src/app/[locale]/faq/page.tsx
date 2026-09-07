import { getTranslations } from 'next-intl/server';
import FaqClient from '@/components/faq/FaqClient';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_FAQS } from '@/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'FaqPage' });
  return {
    title: t('title', { fallback: 'Frequently Asked Questions' }),
    description: t('subtitle', { fallback: 'Find answers to common questions about solar energy.' })
  };
}

export default async function FaqPage() {
  let faqs = [];
  try {
    const data = await fetchGraphQL<{ faqs: any[] }>(GET_FAQS);
    faqs = data?.faqs || [];
  } catch (error) {
    console.error("Failed to fetch FAQs from CMS");
  }

  return <FaqClient faqs={faqs} />;
}
