"use client";

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  documentId: string;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const locale = useLocale();
  const t = useTranslations('BlogPage');

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="min-h-screen pt-24 pb-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href={`/${locale}/blog`} className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center mb-8">
          &larr; Back to Blog
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-emerald-600 font-medium mb-4">{formattedDate}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight">{post.title}</h1>
          
          {post.coverImage && (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-xl">
              <Image 
                src={post.coverImage.url.startsWith('http') ? post.coverImage.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${post.coverImage.url}`} 
                alt={post.title} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert prose-emerald max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
