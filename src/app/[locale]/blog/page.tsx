import { getTranslations } from 'next-intl/server';
import BlogListClient from '@/components/blog/BlogListClient';
import { staticBlogPosts } from '@/lib/staticData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'BlogPage' });
  return {
    title: t('title', { fallback: 'Our Blog' }),
    description: t('subtitle', { fallback: 'Read the latest updates and insights from Kayvi Solar.' })
  };
}

export default async function BlogPage() {
  return <BlogListClient posts={staticBlogPosts} />;
}

