import { titleService } from '../services/titleService.js';
import { tmdbService } from '../services/tmdbService.js';

export const searchController = {
  /**
   * GET /api/search?q=...
   */
  async search(req, res, next) {
    try {
      const { q = '', type, genre, language, mood, page = 1, limit = 12, provider } = req.query;

      // Optional TMDB search route if requested by provider=tmdb
      if (provider === 'tmdb' && tmdbService.isConfigured()) {
        const tmdbResult = await tmdbService.search(q, page);
        return res.status(200).json({
          success: true,
          source: 'tmdb',
          ...tmdbResult
        });
      }

      // Default: Search local database / catalog
      const results = await titleService.searchTitles({
        query: q,
        type,
        genre,
        language,
        mood,
        page,
        limit
      });

      res.status(200).json({
        success: true,
        source: 'database',
        ...results
      });
    } catch (err) {
      next(err);
    }
  }
};
