import { getTranslations } from 'next-intl/server';
import ServicesClient from '@/components/services/ServicesClient';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_PROJECTS } from '@/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'ServicesPage' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle')
  };
}

export default async function ServicesPage() {
  let projects = [];
  try {
    const data = await fetchGraphQL<{ projects: any[] }>(GET_PROJECTS);
    projects = data?.projects || [];
  } catch (error) {
    console.error("Failed to fetch projects from CMS, using fallback.");
  }

  return <ServicesClient projects={projects} />;
}
