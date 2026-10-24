import { getTranslations } from 'next-intl/server';
import GalleryClient from '@/components/gallery/GalleryClient';
import { getStaticProjects } from '@/lib/staticData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'GalleryPage' });
  return {
    title: t('title', { fallback: 'Our Gallery' }),
    description: t('subtitle', { fallback: 'Explore our portfolio of successful solar installations.' })
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  return <GalleryClient projects={getStaticProjects(resolvedParams.locale)} />;
}

