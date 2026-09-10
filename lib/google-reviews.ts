export interface GoogleReview {
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string | null;
  profileUrl: string;
}

export interface GoogleReviewsResult {
  reviews: GoogleReview[];
  overallRating: number | null;
  totalReviewCount: number | null;
  mapsUri: string | null;
}

const EMPTY_RESULT: GoogleReviewsResult = {
  reviews: [],
  overallRating: null,
  totalReviewCount: null,
  mapsUri: null,
};

export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return EMPTY_RESULT;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
      // Google's data can be cached for a while; refresh once a day.
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error("Google Places API error:", res.status, await res.text());
      return EMPTY_RESULT;
    }

    const data = await res.json();

    const reviews: GoogleReview[] = (data.reviews ?? []).map((r: any) => ({
      name: r.authorAttribution?.displayName ?? "Google User",
      role: r.relativePublishTimeDescription ?? "",
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      image: r.authorAttribution?.photoUri ?? null,
      profileUrl: r.authorAttribution?.uri ?? "",
    }));

    return {
      reviews,
      overallRating: typeof data.rating === "number" ? data.rating : null,
      totalReviewCount:
        typeof data.userRatingCount === "number" ? data.userRatingCount : null,
      mapsUri: data.googleMapsUri ?? null,
    };
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return EMPTY_RESULT;
  }
}
