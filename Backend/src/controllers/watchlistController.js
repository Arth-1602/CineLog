import { watchlistService } from '../services/watchlistService.js';

export const watchlistController = {
  /**
   * GET /api/watchlist
   */
  async getWatchlist(req, res, next) {
    try {
      const items = await watchlistService.getWatchlist(req.visitorId);
      res.status(200).json({
        success: true,
        visitorId: req.visitorId,
        count: items.length,
        data: items
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/watchlist
   * Body: { titleId }
   */
  async addToWatchlist(req, res, next) {
    try {
      const { titleId } = req.body;
      const entry = await watchlistService.addToWatchlist(req.visitorId, titleId);

      res.status(201).json({
        success: true,
        message: 'Title successfully added to watchlist.',
        data: entry
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /api/watchlist/:titleId
   */
  async removeFromWatchlist(req, res, next) {
    try {
      const { titleId } = req.params;
      await watchlistService.removeFromWatchlist(req.visitorId, titleId);

      res.status(200).json({
        success: true,
        message: 'Title successfully removed from watchlist.',
        removedId: titleId
      });
    } catch (err) {
      next(err);
    }
  }
};
