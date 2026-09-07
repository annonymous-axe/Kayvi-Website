"use client";

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
}

export default function BlogListClient({ posts = [] }: { posts: BlogPost[] }) {
  const locale = useLocale();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, news, and guides on transitioning to a sustainable solar future.
          </p>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700">
            <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Check back later for new insights!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => {
              const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <motion.div 
                  key={post.documentId} 
                  className="group rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 flex flex-col h-full hover:shadow-2xl transition-all cursor-pointer" 
                  {...fadeIn} 
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/${locale}/blog/${post.slug}`} className="block h-full flex flex-col">
                    <div className="relative h-60 overflow-hidden shrink-0">
                      {post.coverImage ? (
                        <Image 
                          src={post.coverImage.url.startsWith('http') ? post.coverImage.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${post.coverImage.url}`} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                          <span className="text-emerald-600 font-medium">Article</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-sm text-emerald-600 font-medium mb-3">{formattedDate}</div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground flex-grow line-clamp-3">{post.excerpt}</p>
                      <div className="mt-6 font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-2">
                        Read More <span className="text-xl">&rarr;</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
