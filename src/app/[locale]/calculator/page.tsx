import { getTranslations } from 'next-intl/server';
import CalculatorClient from '@/components/calculator/CalculatorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'CalculatorPage' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle')
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  return <CalculatorClient locale={resolvedParams.locale} />; 
}
