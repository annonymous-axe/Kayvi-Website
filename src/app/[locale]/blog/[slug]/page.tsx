import { staticBlogPosts } from '@/lib/staticData';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return staticBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = staticBlogPosts.find((p) => p.slug === resolvedParams.slug);
  if (post) {
    return {
      title: post.title,
      description: post.excerpt || `${post.title} - Kayvi Solar Blog`
    };
  }
  return { title: 'Blog Post' };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = staticBlogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}

