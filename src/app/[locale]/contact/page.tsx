import { getTranslations } from 'next-intl/server';
import ContactClient from '@/components/contact/ContactClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'ContactPage' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle')
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
