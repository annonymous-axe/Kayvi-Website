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
 * Verified past Google Reviews for Kayvi Solar.
 * Pre-sorted from newest to oldest.
 */
export const pastGoogleReviews: GoogleReview[] = [
  {
    id: 'gr-01',
    authorName: 'Harishbhai Patel',
    authorInitials: 'HP',
    avatarBgColor: '#059669', // Emerald
    rating: 5,
    isoDate: '2026-10-20T10:15:00Z',
    timestamp: new Date('2026-10-20T10:15:00Z').getTime(),
    serviceType: 'Residential 5kW Rooftop Solar',
    location: 'Dindoli, Surat',
    isVerifiedGoogleReview: true,
    helpfulCount: 9,
    text: 'Kayvi Solar made our solar journey completely effortless! Vijaybhai and Kamlesh personally inspected our terrace in Dindoli and designed a 5kW monocrystalline bifacial system. Our bi-monthly electricity bill went from ₹14,800 to just ₹240 minimum meter charge. Plus, the PM Surya Ghar Muft Bijli Yojana ₹78,000 subsidy was credited directly to my bank within 30 days! Highly recommended for honest pricing and genuine tier-1 components.',
    ownerResponse: {
      authorName: 'Kayvi Solar (Owner)',
      text: 'Thank you Harishbhai for your valuable trust and wonderful feedback! We are thrilled to see your electricity bills drop to near zero with PM Surya Ghar. Our engineering team is always here for your lifetime maintenance.',
      isoDate: '2026-10-20T16:00:00Z'
    }
  },
  {
    id: 'gr-02',
    authorName: 'Amit Shah',
    authorInitials: 'AS',
    avatarBgColor: '#2563EB', // Blue
    rating: 5,
    isoDate: '2026-10-14T15:45:00Z',
    timestamp: new Date('2026-10-14T15:45:00Z').getTime(),
    serviceType: 'Commercial 100kW Industrial Plant',
    location: 'Pandesara GIDC, Surat',
    isVerifiedGoogleReview: true,
    helpfulCount: 14,
    text: 'We engaged Kayvi Solar for our 100kW industrial rooftop installation at our textile unit in Pandesara. Dipak Patil and their engineering crew completed the high-tension net metering liaisoning, DGVCL approvals, and structural installation in record time without stopping our production. Payback period is under 3.2 years. Outstanding technical expertise and clean workmanship.',
    ownerResponse: {
      authorName: 'Kayvi Solar (Owner)',
      text: 'Thank you Amitbhai! Delivering industrial solar installations on time with maximum ROI is our top priority. We look forward to powering your expansion phase as well.',
      isoDate: '2026-10-15T09:30:00Z'
    }
  },
  {
    id: 'gr-03',
    authorName: 'Meenaben Joshi',
    authorInitials: 'MJ',
    avatarBgColor: '#D97706', // Amber
    rating: 5,
    isoDate: '2026-09-28T11:20:00Z',
    timestamp: new Date('2026-09-28T11:20:00Z').getTime(),
    serviceType: 'Solar Water Heater 500 LPD',
    location: 'Adajan, Surat',
    isVerifiedGoogleReview: true,
    helpfulCount: 6,
    text: 'Installed a 500 LPD commercial-grade ETC pressurized solar water heating system for our residential apartment building in Adajan. Hot water is available 24/7 even during cloudy mornings. The team at Kayvi Solar is courteous, responsive, and prompt with annual maintenance.',
  }
];

/**
 * Merge live reviews with past reviews, deduplicating by ID,
 * and sort strictly from newest to oldest (timestamp descending).
 * Any newly posted review will naturally be placed at index 0 (first place).
 */
export function mergeAndSortReviews(
  past: GoogleReview[] = pastGoogleReviews,
  live: GoogleReview[] = []
): GoogleReview[] {
  const map = new Map<string, GoogleReview>();

  // Add past reviews
  past.forEach((r) => {
    map.set(r.id, r);
  });

  // Add or update live reviews
  live.forEach((r) => {
    map.set(r.id, r);
  });

  // Convert to array and sort newest first (timestamp descending)
  return Array.from(map.values()).sort((a, b) => {
    const timeA = a.timestamp || new Date(a.isoDate).getTime();
    const timeB = b.timestamp || new Date(b.isoDate).getTime();
    return timeB - timeA;
  });
}

/**
 * Format relative time (e.g. "Just now", "2 days ago", "1 month ago")
 * localized for English, Hindi, and Gujarati.
 */
export function formatReviewRelativeTime(isoDate: string, locale: string = 'en'): string {
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
 * Fetch live reviews from configured endpoint (REST API / Webhook / Google Places proxy).
 * Falls back safely to empty array if endpoint is unreachable or not configured.
 */
export async function fetchLiveGoogleReviews(): Promise<GoogleReview[]> {
  const apiUrl = siteConfig.googleReviews.apiUrl;
  const placeId = siteConfig.googleReviews.placeId;

  if (!apiUrl && !placeId) {
    return [];
  }

  try {
    const url = new URL(apiUrl || 'https://api.kayvisolar.com/api/v1/reviews');
    if (placeId) {
      url.searchParams.set('placeId', placeId);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

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

    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    if (data && Array.isArray(data.reviews)) {
      return data.reviews;
    }
    return [];
  } catch (err) {
    // Graceful fallback for static build or offline environment
    return [];
  }
}
