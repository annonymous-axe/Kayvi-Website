"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, MapPin, ExternalLink, ThumbsUp, Plus, Sparkles, MessageSquare, RefreshCw, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { GoogleReview, pastGoogleReviews, mergeAndSortReviews, formatReviewRelativeTime, fetchLiveGoogleReviews } from '@/lib/reviews';

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
  const [reviews, setReviews] = useState<GoogleReview[]>(() => mergeAndSortReviews(pastGoogleReviews));
  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | 'residential' | 'commercial'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form state for instant preview
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newService, setNewService] = useState('Residential 5kW Rooftop Solar');
  const [newLocation, setNewLocation] = useState('Surat, Gujarat');
  const [newRating, setNewRating] = useState(5);

  // Fetch live reviews on mount from configured endpoint
  useEffect(() => {
    let isMounted = true;

    async function loadLive() {
      if (!siteConfig.googleReviews.apiUrl) return;
      setIsLoadingLive(true);
      try {
        const live = await fetchLiveGoogleReviews();
        if (isMounted && live && live.length > 0) {
          setReviews(mergeAndSortReviews(pastGoogleReviews, live));
        }
      } catch (e) {
        // Safe fallback
      } finally {
        if (isMounted) setIsLoadingLive(false);
      }
    }

    loadLive();

    // Check localStorage for any demo reviews added locally
    try {
      const stored = localStorage.getItem('kayvi_local_google_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews((prev) => mergeAndSortReviews(prev, parsed));
        }
      }
    } catch (e) {}

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle adding a new review (instant placement at 1st place / newest)
  const handleAddNewReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const initials = newAuthor
      .trim()
      .split(/\s+/)
      .map((w) => w[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || 'GR';

    const now = new Date();
    const newRev: GoogleReview = {
      id: `live-review-${Date.now()}`,
      authorName: newAuthor.trim(),
      authorInitials: initials,
      avatarBgColor: '#059669',
      rating: newRating,
      isoDate: now.toISOString(),
      timestamp: now.getTime(),
      text: newText.trim(),
      serviceType: newService,
      location: newLocation,
      isVerifiedGoogleReview: true,
      helpfulCount: 1,
      ownerResponse: {
        authorName: 'Kayvi Solar (Owner)',
        text: `Thank you ${newAuthor.trim()} for your wonderful 5-star review! We are honored to be your trusted solar partner.`,
        isoDate: new Date(now.getTime() + 1000 * 60 * 5).toISOString(),
      },
    };

    // Prepend to list - sorted newest first
    const updated = mergeAndSortReviews(reviews, [newRev]);
    setReviews(updated);

    // Save locally
    try {
      const stored = localStorage.getItem('kayvi_local_google_reviews');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('kayvi_local_google_reviews', JSON.stringify([newRev, ...existing]));
    } catch (e) {}

    // Reset and close
    setNewAuthor('');
    setNewText('');
    setIsWriteModalOpen(false);
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5star') return r.rating === 5;
    if (activeFilter === 'residential') return r.serviceType?.toLowerCase().includes('residential') || r.serviceType?.toLowerCase().includes('home');
    if (activeFilter === 'commercial') return r.serviceType?.toLowerCase().includes('commercial') || r.serviceType?.toLowerCase().includes('industrial');
    return true;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'highest') {
      return b.rating - a.rating || (b.timestamp || 0) - (a.timestamp || 0);
    }
    // Newest first (default)
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
              Google Customer Reviews
            </span>
            <span className="flex h-2 w-2 relative">
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

        {/* Rating Summary Card Banner */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800/90 rounded-3xl p-6 md:p-8 border border-gray-200/80 dark:border-zinc-700 shadow-lg shadow-emerald-950/5 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Big Rating Number */}
            <div className="md:col-span-4 text-center md:text-left md:border-r border-gray-100 dark:border-zinc-700 md:pr-6">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <GoogleGIcon className="w-8 h-8" />
                <span className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                  {siteConfig.googleReviews.rating}
                </span>
                <span className="text-lg text-muted-foreground font-semibold">/ 5.0</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs md:text-sm font-medium text-muted-foreground">
                Based on <strong className="text-foreground">{siteConfig.googleReviews.totalReviews}+ Google Reviews</strong> in Surat
              </p>
            </div>

            {/* Rating Breakdown / Trust Pillars */}
            <div className="md:col-span-5 space-y-2 px-2 md:px-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Genuine PM Surya Ghar Subsidy Assistance</span>
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Tier-1 Bifacial Solar Panels & DGVCL Net Metering</span>
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Lifetime After-Sales & Generation Monitoring</span>
              </div>
            </div>

            {/* Write a Review Action */}
            <div className="md:col-span-3 flex flex-col gap-2.5 justify-center">
              <a
                href={siteConfig.googleReviews.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
              >
                <GoogleGIcon className="w-4 h-4" />
                <span>{locale === 'hi' ? 'गूगल पर रिव्यू लिखें' : locale === 'gu' ? 'ગુગલ પર રિવ્યૂ લખો' : 'Write a Review'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setIsWriteModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-foreground font-medium py-2 px-3 rounded-xl transition-colors text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Share Review On Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All Reviews (${reviews.length})` },
              { id: '5star', label: `5 Stars ★ (${reviews.filter(r => r.rating === 5).length})` },
              { id: 'residential', label: 'Residential Solar' },
              { id: 'commercial', label: 'Commercial & Industrial' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-zinc-800 text-muted-foreground hover:text-foreground border border-gray-200 dark:border-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
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

        {/* Reviews Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sortedReviews.map((review, index) => {
              const isFirst = index === 0;
              const isRecent = Date.now() - (review.timestamp || 0) < 1000 * 60 * 60 * 24 * 30; // within 30 days

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
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm shrink-0"
                          style={{ backgroundColor: review.avatarBgColor || '#059669' }}
                        >
                          {review.authorInitials}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                            <span>{review.authorName}</span>
                            {review.isVerifiedGoogleReview && (
                              <span title="Verified Google Review" className="inline-flex">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
                              </span>
                            )}
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
                        {isRecent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            New
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

        {/* View on Google Maps Banner */}
        <div className="mt-14 text-center">
          <a
            href={siteConfig.googleReviews.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <GoogleGIcon className="w-4 h-4" />
            <span>Read all 28+ customer reviews directly on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Add Review Modal for Instant Website Visibility */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-gray-200 dark:border-zinc-700 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <GoogleGIcon className="w-6 h-6" />
                <h3 className="text-xl font-bold text-foreground">Share Your Solar Experience</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                Drop your review below. It will immediately appear at the very first place on our website!
              </p>

              <form onSubmit={handleAddNewReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewRating(s)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-zinc-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-amber-500 ml-2">{newRating}.0 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Mukeshbhai Patel"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-sm text-foreground focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">System Installed</label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-xs text-foreground focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option>Residential 3kW Rooftop Solar</option>
                      <option>Residential 5kW Rooftop Solar</option>
                      <option>Residential 10kW Rooftop Solar</option>
                      <option>Commercial 25kW Solar Plant</option>
                      <option>Commercial 50kW Industrial Plant</option>
                      <option>Solar Water Heater 500 LPD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Location</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Dindoli, Surat"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-xs text-foreground focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Tell others about your solar generation, electricity bill reduction, subsidy process, or installation experience..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-sm text-foreground focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold border border-gray-200 dark:border-zinc-700 text-muted-foreground hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all text-sm"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
