import { fetchGraphQL } from '@/lib/graphql';
import { GET_BLOG_POST_BY_SLUG } from '@/lib/queries';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const data = await fetchGraphQL<{ blogPosts: any[] }>(GET_BLOG_POST_BY_SLUG, { slug: resolvedParams.slug });
    const post = data?.blogPosts?.[0];
    if (post) {
      return {
        title: post.title,
        description: post.excerpt || `${post.title} - Kayvi Solar Blog`
      };
    }
  } catch (error) {
    console.error("Failed to fetch blog post metadata");
  }
  return { title: 'Blog Post' };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post = null;

  try {
    const data = await fetchGraphQL<{ blogPosts: any[] }>(GET_BLOG_POST_BY_SLUG, { slug: resolvedParams.slug });
    post = data?.blogPosts?.[0];
  } catch (error) {
    console.error("Failed to fetch blog post");
  }

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
