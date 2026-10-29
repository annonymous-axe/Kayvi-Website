import { siteConfig } from '@/config/site';

export interface GoogleReview {
  id: string;
  authorName: string;
  authorInitials: string;
  authorPhotoUrl?: string;
  avatarBgColor?: string;
  rating: number; // 1 to 5
  isoDate: string; // ISO format e.g. "2026-10-24T14:30:00Z"
  timestamp: number; // Unix epoch ms for exact sorting
  text: string;
  serviceType?: string;
  location?: string;
  isVerifiedGoogleReview: boolean;
  helpfulCount?: number;
  ownerResponse?: {
    authorName: string;
    text: string;
    isoDate: string;
  };
}

/**
 * Real past Google Reviews cache.
 * Initialized to empty array: NO fake or placeholder reviews are ever hardcoded.
 * All reviews are dynamically fetched from the live Google Reviews endpoint.
 */
export const pastGoogleReviews: GoogleReview[] = [];

/**
 * Merge reviews, deduplicate by ID,
 * and sort strictly from newest to oldest (timestamp descending).
 * Any newly posted Google review will naturally appear at index 0 (first place).
 */
export function mergeAndSortReviews(
  existing: GoogleReview[] = [],
  fresh: GoogleReview[] = []
): GoogleReview[] {
  const map = new Map<string, GoogleReview>();

  existing.forEach((r) => {
    if (r && r.id) map.set(r.id, r);
  });

  fresh.forEach((r) => {
    if (r && r.id) map.set(r.id, r);
  });

  return Array.from(map.values()).sort((a, b) => {
    const timeA = a.timestamp || (a.isoDate ? new Date(a.isoDate).getTime() : 0);
    const timeB = b.timestamp || (b.isoDate ? new Date(b.isoDate).getTime() : 0);
    return timeB - timeA;
  });
}

/**
 * Helper to generate initials from a name (e.g. "Mukesh Patel" -> "MP").
 */
export function getInitials(name: string): string {
  if (!name) return 'GS';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Helper to generate consistent avatar background colors based on reviewer name.
 */
const AVATAR_COLORS = ['#059669', '#2563EB', '#D97706', '#7C3AED', '#DC2626', '#0891B2', '#4F46E5'];
export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/**
 * Format relative time (e.g. "Just now", "2 days ago", "1 month ago")
 * localized for English, Hindi, and Gujarati.
 */
export function formatReviewRelativeTime(isoDate: string, locale: string = 'en'): string {
  if (!isoDate) return '';
  const now = Date.now();
  const past = new Date(isoDate).getTime();
  const diffSec = Math.max(0, Math.floor((now - past) / 1000));

  const minutes = Math.floor(diffSec / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (locale === 'hi') {
    if (diffSec < 120) return 'अभी-अभी';
    if (hours < 1) return `${minutes} मिनट पहले`;
    if (hours < 24) return `${hours} घंटे पहले`;
    if (days < 7) return `${days} दिन पहले`;
    if (weeks < 5) return `${weeks} सप्ताह पहले`;
    if (months < 12) return `${months} महीने पहले`;
    return `${years} वर्ष पहले`;
  }

  if (locale === 'gu') {
    if (diffSec < 120) return 'હમણાં જ';
    if (hours < 1) return `${minutes} મિનિટ પહેલાં`;
    if (hours < 24) return `${hours} કલાક પહેલાં`;
    if (days < 7) return `${days} દિવસ પહેલાં`;
    if (weeks < 5) return `${weeks} અઠવાડિયા પહેલાં`;
    if (months < 12) return `${months} મહિના પહેલાં`;
    return `${years} વર્ષ પહેલાં`;
  }

  // English default
  if (diffSec < 120) return 'Just now';
  if (hours < 1) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (weeks < 5) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

/**
 * Normalizes raw Google Places API review format into standard GoogleReview.
 */
function normalizeGoogleReview(raw: any, index: number): GoogleReview {
  const authorName = raw.author_name || raw.authorName || 'Google User';
  const timestamp = raw.time ? raw.time * 1000 : (raw.timestamp || Date.now() - index * 86400000);
  const isoDate = raw.isoDate || new Date(timestamp).toISOString();

  return {
    id: raw.id || `google-${timestamp}-${authorName.replace(/\s+/g, '_')}`,
    authorName,
    authorInitials: getInitials(authorName),
    authorPhotoUrl: raw.profile_photo_url || raw.authorPhotoUrl,
    avatarBgColor: getAvatarColor(authorName),
    rating: Number(raw.rating) || 5,
    isoDate,
    timestamp,
    text: raw.text || '',
    serviceType: raw.serviceType || 'Solar Rooftop Installation',
    location: raw.location || 'Surat, Gujarat',
    isVerifiedGoogleReview: true,
    helpfulCount: raw.helpfulCount || 0,
    ownerResponse: raw.ownerResponse || (raw.owner_response ? {
      authorName: raw.owner_response.author_name || 'Kayvi Solar (Owner)',
      text: raw.owner_response.text || '',
      isoDate: raw.owner_response.iso_date || new Date().toISOString()
    } : undefined),
  };
}

/**
 * Fetch live reviews from configured endpoint (REST API / Cloudflare Edge / Google Places proxy).
 * Checks sessionStorage cache (5 min TTL) to avoid wasteful API quota consumption,
 * while automatically fetching newly submitted reviews.
 */
const CACHE_KEY = 'kayvi_live_google_reviews';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchLiveGoogleReviews(): Promise<GoogleReview[]> {
  const apiUrl = siteConfig.googleReviews.apiUrl;
  const placeId = siteConfig.googleReviews.placeId;

  // 1. Check in-memory / sessionStorage cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, savedAt } = JSON.parse(cached);
        if (Date.now() - savedAt < CACHE_TTL_MS && Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }

  // 2. Build target URL
  let targetUrl = apiUrl || '/api/reviews';
  if (typeof window !== 'undefined' && targetUrl.startsWith('/')) {
    targetUrl = `${window.location.origin}${targetUrl}`;
  }

  try {
    const url = new URL(targetUrl);
    if (placeId) {
      url.searchParams.set('placeId', placeId);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    let rawList: any[] = [];

    // Support multiple standard response envelopes
    if (Array.isArray(json)) {
      rawList = json;
    } else if (json && Array.isArray(json.reviews)) {
      rawList = json.reviews;
    } else if (json && json.result && Array.isArray(json.result.reviews)) {
      rawList = json.result.reviews;
    }

    const normalized = rawList.map((item, idx) => normalizeGoogleReview(item, idx));
    const sorted = mergeAndSortReviews([], normalized);

    // Cache to sessionStorage if valid
    if (typeof window !== 'undefined' && sorted.length > 0) {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
          data: sorted,
          savedAt: Date.now()
        }));
      } catch {
        // Ignore cache storage errors
      }
    }

    return sorted;
  } catch (err) {
    // Graceful fallback: return empty array rather than fake data
    return [];
  }
}
