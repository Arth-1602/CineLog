/**
 * Utility helpers for CineLog
 */

export const PLACEHOLDER_POSTER = '/images/poster-placeholder.jpg';
export const DEFAULT_HERO_BACKDROP = '/images/hero-cinematic.jpg';

/**
 * Returns formatted poster URL with graceful fallback
 * Structured so TMDB image paths (e.g., /qJ2tW6WMUDux911r6m7haRef0WH.jpg) can be appended with TMDB CDN
 */
export function getPosterUrl(posterUrl) {
  if (!posterUrl || typeof posterUrl !== 'string' || posterUrl.trim() === '') {
    return PLACEHOLDER_POSTER;
  }
  // If it's a relative TMDB path
  if (posterUrl.startsWith('/') && !posterUrl.startsWith('/images/')) {
    return `https://image.tmdb.org/t/p/w500${posterUrl}`;
  }
  return posterUrl;
}

/**
 * Formats ratings cleanly without fake verified certifications
 */
export function formatRating(rating) {
  if (typeof rating !== 'number' || isNaN(rating)) return 'NR';
  return rating.toFixed(1);
}

/**
 * Filters movies based on multiple intersecting criteria
 */
export function filterMovies(movies, { query = '', type = 'all', genre = 'All Genres', language = 'All Languages', mood = null }) {
  if (!Array.isArray(movies)) return [];

  const cleanQuery = query.trim().toLowerCase();

  return movies.filter((item) => {
    // 1. Text search by title, director, cast, or synopsis
    if (cleanQuery) {
      const matchTitle = item.title?.toLowerCase().includes(cleanQuery);
      const matchDirector = item.director?.toLowerCase().includes(cleanQuery);
      const matchCast = item.cast?.some(actor => actor.toLowerCase().includes(cleanQuery));
      const matchSynopsis = item.synopsis?.toLowerCase().includes(cleanQuery);
      if (!matchTitle && !matchDirector && !matchCast && !matchSynopsis) {
        return false;
      }
    }

    // 2. Filter by Type ('all', 'movie', 'tv')
    if (type && type !== 'all') {
      if (item.type !== type) return false;
    }

    // 3. Filter by Genre
    if (genre && genre !== 'All Genres') {
      if (!item.genres?.includes(genre)) return false;
    }

    // 4. Filter by Language
    if (language && language !== 'All Languages') {
      if (item.language?.toLowerCase() !== language.toLowerCase()) return false;
    }

    // 5. Filter by Mood tag
    if (mood) {
      if (!item.moods?.includes(mood)) return false;
    }

    return true;
  });
}
