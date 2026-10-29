"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, MapPin, ExternalLink, ThumbsUp, MessageSquare, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { GoogleReview, mergeAndSortReviews, formatReviewRelativeTime, fetchLiveGoogleReviews } from '@/lib/reviews';

// Google 4-color G SVG Icon
export function GoogleGIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

interface GoogleReviewsProps {
  locale?: string;
  title?: string;
  subtitle?: string;
}

export default function GoogleReviews({
  locale = 'en',
  title,
  subtitle,
}: GoogleReviewsProps) {
  // Start with empty array: absolutely NO fake or mock reviews
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | '5star'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');
  const [isLoadingLive, setIsLoadingLive] = useState(true);

  // Fetch real-time reviews directly from Google / API
  useEffect(() => {
    let isMounted = true;

    async function loadLive() {
      setIsLoadingLive(true);
      try {
        const live = await fetchLiveGoogleReviews();
        if (isMounted && Array.isArray(live)) {
          setReviews(mergeAndSortReviews([], live));
        }
      } catch (e) {
        // Safe fallback
      } finally {
        if (isMounted) setIsLoadingLive(false);
      }
    }

    loadLive();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5star') return r.rating === 5;
    return true;
  });

  // Sort reviews: Newest First (default, timestamp descending) or Highest Rated
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'highest') {
      return b.rating - a.rating || (b.timestamp || 0) - (a.timestamp || 0);
    }
    return (b.timestamp || 0) - (a.timestamp || 0);
  });

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/5 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm mb-4">
            <GoogleGIcon className="w-4 h-4" />
            <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-wider">
              Google Verified Reviews
            </span>
            <span className="flex h-2 w-2 relative" title="Live Google Reviews Sync">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            {title || (locale === 'hi' ? 'गूगल पर हमारे ग्राहकों की राय' : locale === 'gu' ? 'ગુગલ પર અમારા ગ્રાહકોના રિવ્યૂ' : 'Trusted by Homeowners & Businesses on Google')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {subtitle || (locale === 'hi'
              ? 'सूरत और पूरे गुजरात में कायवी सोलर के साथ सोलर अपनाने वाले ग्राहकों के वास्तविक अनुभव।'
              : locale === 'gu'
              ? 'સુરત અને સમગ્ર ગુજરાતમાં કાયવી સોલર સાથે સોલાર લગાવનાર ગ્રાહકોના સાચા અનુભવો.'
              : 'Real, verified feedback from property owners who slashed electricity bills with Kayvi Solar.')}
          </p>
        </div>

        {/* Official Google Rating Banner */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800/90 rounded-3xl p-6 md:p-8 border border-gray-200/80 dark:border-zinc-700 shadow-lg shadow-emerald-950/5 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Big Rating Number */}
            <div className="md:col-span-4 text-center md:text-left md:border-r border-gray-100 dark:border-zinc-700 md:pr-6">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <GoogleGIcon className="w-9 h-9" />
                <span className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                  {siteConfig.googleReviews.rating.toFixed(1)}
                </span>
                <span className="text-lg text-muted-foreground font-semibold">/ 5.0</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs md:text-sm font-medium text-muted-foreground">
                Based on <strong className="text-foreground">{siteConfig.googleReviews.totalReviews} Google reviews</strong> in Surat
              </p>
            </div>

            {/* Rating Breakdown / Trust Pillars */}
            <div className="md:col-span-4 space-y-2.5 px-2 md:px-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Genuine PM Surya Ghar Subsidy</span>
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>DGVCL Net Metering & Tier-1 Panels</span>
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Lifetime Support & Generation Guarantee</span>
              </div>
            </div>

            {/* Write a Review Action */}
            <div className="md:col-span-4 flex flex-col gap-2 justify-center">
              <a
                href={siteConfig.googleReviews.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-sm hover:scale-[1.02]"
              >
                <GoogleGIcon className="w-5 h-5" />
                <span>{locale === 'hi' ? 'गूगल पर रिव्यू लिखें' : locale === 'gu' ? 'ગુગલ પર રિવ્યૂ લખો' : 'Write a Review on Google'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-center text-muted-foreground">
                Reviews are posted directly on Google and sync automatically here.
              </p>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoadingLive && (
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Fetching verified reviews live from Google...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-zinc-800/60 rounded-2xl p-6 border border-gray-200/70 dark:border-zinc-700 animate-pulse space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-2/3" />
                      <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-1/4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-full" />
                    <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-5/6" />
                    <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Grid (Shown when live reviews exist) */}
        {!isLoadingLive && reviews.length > 0 && (
          <>
            {/* Filter and Sort Bar */}
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === 'all'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-zinc-800 text-muted-foreground hover:text-foreground border border-gray-200 dark:border-zinc-700'
                  }`}
                >
                  All Reviews ({reviews.length})
                </button>
                <button
                  onClick={() => setActiveFilter('5star')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === '5star'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-zinc-800 text-muted-foreground hover:text-foreground border border-gray-200 dark:border-zinc-700'
                  }`}
                >
                  5 Stars ★ ({reviews.filter((r) => r.rating === 5).length})
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground font-medium">Sort by:</span>
                <div className="inline-flex rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-0.5">
                  <button
                    onClick={() => setSortBy('newest')}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      sortBy === 'newest'
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Newest First
                  </button>
                  <button
                    onClick={() => setSortBy('highest')}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      sortBy === 'highest'
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Highest Rated
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedReviews.map((review, index) => {
                  const isFirst = index === 0;

                  return (
                    <motion.div
                      key={review.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                      className={`bg-white dark:bg-zinc-800/90 rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                        isFirst
                          ? 'border-emerald-500/50 dark:border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/20'
                          : 'border-gray-200/80 dark:border-zinc-700'
                      }`}
                    >
                      <div>
                        {/* Header: Author & Google Badge */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            {review.authorPhotoUrl ? (
                              <Image
                                src={review.authorPhotoUrl}
                                alt={review.authorName}
                                width={44}
                                height={44}
                                className="w-11 h-11 rounded-full object-cover shadow-sm shrink-0"
                              />
                            ) : (
                              <div
                                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm shrink-0"
                                style={{ backgroundColor: review.avatarBgColor || '#059669' }}
                              >
                                {review.authorInitials}
                              </div>
                            )}
                            <div>
                              <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                                <span>{review.authorName}</span>
                                <span title="Verified Google Review" className="inline-flex">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
                                </span>
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                  {formatReviewRelativeTime(review.isoDate, locale)}
                                </span>
                                {review.location && (
                                  <>
                                    <span>•</span>
                                    <span className="flex items-center gap-0.5">
                                      <MapPin className="w-3 h-3 text-muted-foreground" />
                                      {review.location}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {isFirst && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                Latest
                              </span>
                            )}
                            <GoogleGIcon className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 text-amber-400 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Service Type Tag */}
                        {review.serviceType && (
                          <div className="mb-3">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-100 dark:bg-zinc-700/60 text-muted-foreground border border-gray-200/50 dark:border-zinc-700">
                              {review.serviceType}
                            </span>
                          </div>
                        )}

                        {/* Review Text */}
                        <p className="text-sm text-foreground/85 leading-relaxed mb-4">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>

                      <div>
                        {/* Owner Response (if any) */}
                        {review.ownerResponse && (
                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-700/60 bg-gray-50/70 dark:bg-zinc-800/60 p-3 rounded-xl">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>Response from {review.ownerResponse.authorName}</span>
                            </div>
                            <p className="text-xs text-muted-foreground italic leading-relaxed">
                              &ldquo;{review.ownerResponse.text}&rdquo;
                            </p>
                          </div>
                        )}

                        {/* Helpful count */}
                        {review.helpfulCount && review.helpfulCount > 0 && (
                          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{review.helpfulCount} people found this helpful</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Direct Google Verification Showcase Card (When waiting for API or direct from Google) */}
        {!isLoadingLive && reviews.length === 0 && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800/90 rounded-3xl p-8 border border-gray-200 dark:border-zinc-700 text-center shadow-lg">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 mb-4">
              <GoogleGIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Verified Kayvi Solar Google Business Listing
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Our 5.0-star customer reviews are hosted directly on Google. Read verified customer experiences or drop your own feedback on Google!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={siteConfig.googleReviews.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all text-sm"
              >
                <GoogleGIcon className="w-4 h-4" />
                <span>Read Verified Reviews on Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.googleReviews.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/60 font-semibold py-3 px-6 rounded-xl transition-all text-sm text-foreground"
              >
                <span>Write a Review on Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* View on Google Search / Google Maps Banner */}
        <div className="mt-14 text-center">
          <a
            href={siteConfig.googleReviews.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <GoogleGIcon className="w-4 h-4" />
            <span>Read all customer reviews directly on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
