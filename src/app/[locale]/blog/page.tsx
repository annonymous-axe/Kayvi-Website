import { getTranslations } from 'next-intl/server';
import BlogListClient from '@/components/blog/BlogListClient';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_BLOG_POSTS } from '@/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'BlogPage' });
  return {
    title: t('title', { fallback: 'Our Blog' }),
    description: t('subtitle', { fallback: 'Read the latest updates and insights from Kayvi Solar.' })
  };
}

export default async function BlogPage() {
  let posts = [];
  try {
    const data = await fetchGraphQL<{ blogPosts: any[] }>(GET_BLOG_POSTS);
    posts = data?.blogPosts || [];
  } catch (error) {
    console.error("Failed to fetch blog posts from CMS");
  }

  return <BlogListClient posts={posts} />;
}
