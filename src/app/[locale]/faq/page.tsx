import { getTranslations } from 'next-intl/server';
import FaqClient from '@/components/faq/FaqClient';
import { getStaticFaqs } from '@/lib/staticData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'FaqPage' });
  return {
    title: t('title', { fallback: 'Frequently Asked Questions' }),
    description: t('subtitle', { fallback: 'Find answers to common questions about solar energy.' })
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  return <FaqClient faqs={getStaticFaqs(resolvedParams.locale)} />;
}

