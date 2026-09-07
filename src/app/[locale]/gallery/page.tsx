import { getTranslations } from 'next-intl/server';
import GalleryClient from '@/components/gallery/GalleryClient';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_PROJECTS } from '@/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'GalleryPage' });
  return {
    title: t('title', { fallback: 'Our Gallery' }),
    description: t('subtitle', { fallback: 'Explore our portfolio of successful solar installations.' })
  };
}

export default async function GalleryPage() {
  let projects = [];
  try {
    const data = await fetchGraphQL<{ projects: any[] }>(GET_PROJECTS);
    projects = data?.projects || [];
  } catch (error) {
    console.error("Failed to fetch projects for gallery");
  }

  return <GalleryClient projects={projects} />;
}
