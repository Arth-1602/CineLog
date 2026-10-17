import { titleService } from '../services/titleService.js';

export const titleController = {
  /**
   * GET /api/titles
   * Query params: page, limit, type, genre, language, mood, sort
   */
  async getTitles(req, res, next) {
    try {
      const result = await titleService.getTitles(req.query);
      res.status(200).json({
        success: true,
        ...result
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/titles/:id
   */
  async getTitleById(req, res, next) {
    try {
      const { id } = req.params;
      const title = await titleService.getTitleById(id);

      if (!title) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'TITLE_NOT_FOUND',
            message: `Title with ID '${id}' was not found.`
          }
        });
      }

      res.status(200).json({
        success: true,
        data: title
      });
    } catch (err) {
      next(err);
    }
  }
};
