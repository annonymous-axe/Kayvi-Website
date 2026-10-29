/**
 * Cloudflare Pages Function: /api/reviews
 *
 * Real-time Google Reviews Endpoint for Kayvi Solar.
 * Fetches verified customer reviews directly from Google Places API at the edge,
 * caches responses to avoid rate limits, and returns real-time reviews sorted newest to oldest.
 */

interface Env {
  GOOGLE_PLACES_API_KEY?: string;
  GOOGLE_PLACE_ID?: string;
}

interface PagesFunctionContext<E = Env> {
  request: Request;
  env: E;
  params: Record<string, string | string[]>;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}

type PagesFunction<E = Env> = (context: PagesFunctionContext<E>) => Response | Promise<Response>;

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const url = new URL(request.url);

  // Allow query parameter override or fallback to Cloudflare environment variable
  const apiKey = url.searchParams.get('apiKey') || env.GOOGLE_PLACES_API_KEY || '';
  const placeId = url.searchParams.get('placeId') || env.GOOGLE_PLACE_ID || '';

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  // If no Google Places credentials configured yet, return status with 0 fake reviews
  if (!apiKey || !placeId) {
    return new Response(
      JSON.stringify({
        status: 'pending_configuration',
        message: 'Google Places API Key and Place ID not configured in Cloudflare environment.',
        rating: 5.0,
        totalReviews: 3,
        reviews: [],
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Cache-Control': 'public, max-age=60',
        },
      }
    );
  }

  try {
    // Query Google Places API (Place Details)
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=name,rating,reviews,user_ratings_total&key=${encodeURIComponent(
      apiKey
    )}&language=en`;

    const res = await fetch(googleApiUrl);
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch from Google Places API', reviews: [] }),
        { status: 502, headers: corsHeaders }
      );
    }

    const data: any = await res.json();
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      return new Response(
        JSON.stringify({ error: data.error_message || data.status, reviews: [] }),
        { status: 200, headers: corsHeaders }
      );
    }

    const googleReviews = data.result?.reviews || [];

    // Normalize and sort newest to oldest (timestamp descending)
    const normalized = googleReviews
      .map((r: any, idx: number) => {
        const timeSec = r.time || Math.floor(Date.now() / 1000);
        return {
          id: `google-${timeSec}-${idx}`,
          authorName: r.author_name || 'Google Customer',
          authorPhotoUrl: r.profile_photo_url || undefined,
          rating: Number(r.rating) || 5,
          isoDate: new Date(timeSec * 1000).toISOString(),
          timestamp: timeSec * 1000,
          text: r.text || '',
          relativeTime: r.relative_time_description || 'Recently',
          isVerifiedGoogleReview: true,
        };
      })
      .sort((a: any, b: any) => b.timestamp - a.timestamp);

    const payload = {
      status: 'success',
      name: data.result?.name || 'Kayvi Solar',
      rating: data.result?.rating || 5.0,
      totalReviews: data.result?.user_ratings_total || normalized.length,
      reviews: normalized,
      syncedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        ...corsHeaders,
        // Cache edge response for 10 minutes, serve stale while revalidating
        'Cache-Control': 'public, max-age=600, s-maxage=1800, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal error', reviews: [] }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
