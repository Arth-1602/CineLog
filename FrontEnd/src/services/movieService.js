import { SAMPLE_MOVIES, MOODS, GENRES, LANGUAGES, TYPES, FEATURED_HERO } from '../data/movies';

export const movieService = {
  /**
   * Returns all titles
   */
  async getAllTitles() {
    // Simulate slight network latency to show slick skeleton loading state
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...SAMPLE_MOVIES]);
      }, 250);
    });
  },

  /**
   * Get title by ID
   */
  async getTitleById(id) {
    const movie = SAMPLE_MOVIES.find(m => m.id === id);
    return movie || null;
  },

  /**
   * Get trending movies
   */
  getTrendingMovies() {
    return SAMPLE_MOVIES.filter(m => m.type === 'movie' && m.trending);
  },

  /**
   * Get popular TV shows
   */
  getPopularTV() {
    return SAMPLE_MOVIES.filter(m => m.type === 'tv' && m.popular);
  },

  /**
   * Get Hero title
   */
  getFeaturedTitle() {
    return FEATURED_HERO;
  },

  getMoods() {
    return MOODS;
  },

  getGenres() {
    return GENRES;
  },

  getLanguages() {
    return LANGUAGES;
  },

  getTypes() {
    return TYPES;
  }
};
