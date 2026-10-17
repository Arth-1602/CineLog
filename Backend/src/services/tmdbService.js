import { config } from '../config/env.js';

export const tmdbService = {
  /**
   * Check if TMDB API is configured
   */
  isConfigured() {
    return Boolean(config.tmdb.apiKey && config.tmdb.apiKey.trim() !== '');
  },

  /**
   * Fetch trending movies or TV from TMDB if configured
   */
  async getTrending(mediaType = 'movie', timeWindow = 'week') {
    if (!this.isConfigured()) {
      return {
        configured: false,
        message: 'TMDB API key not configured. Using CineLog curated catalog.'
      };
    }

    try {
      const url = `${config.tmdb.baseUrl}/trending/${mediaType}/${timeWindow}?api_key=${config.tmdb.apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`TMDB responded with status ${response.status}`);
      }
      const data = await response.json();
      return {
        configured: true,
        results: data.results?.map(item => this.transformTmdbTitle(item, mediaType)) || []
      };
    } catch (err) {
      console.warn('[TMDB Service] Fetch error:', err.message);
      return {
        configured: true,
        error: err.message,
        results: []
      };
    }
  },

  /**
   * Search titles via TMDB
   */
  async search(query, page = 1) {
    if (!this.isConfigured()) {
      return {
        configured: false,
        message: 'TMDB API key not configured. Running search against internal database.'
      };
    }

    try {
      const url = `${config.tmdb.baseUrl}/search/multi?api_key=${config.tmdb.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`TMDB responded with status ${response.status}`);
      }
      const data = await response.json();
      return {
        configured: true,
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
        results: (data.results || [])
          .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
          .map(item => this.transformTmdbTitle(item, item.media_type))
      };
    } catch (err) {
      console.warn('[TMDB Service] Search error:', err.message);
      return {
        configured: true,
        error: err.message,
        results: []
      };
    }
  },

  /**
   * Normalize TMDB item into CineLog Title shape
   */
  transformTmdbTitle(item, type = 'movie') {
    const isTv = type === 'tv' || item.media_type === 'tv';
    return {
      title: isTv ? item.name : item.title,
      type: isTv ? 'tv' : 'movie',
      releaseYear: parseInt((isTv ? item.first_air_date : item.release_date)?.substring(0, 4), 10) || null,
      rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : 0,
      voteCount: item.vote_count || 0,
      synopsis: item.overview || 'No synopsis available.',
      language: item.original_language?.toUpperCase() || 'EN',
      posterPath: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
      backdropPath: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : '',
      externalProviderId: `tmdb-${item.id}`,
      genres: [],
      moodTags: []
    };
  }
};
