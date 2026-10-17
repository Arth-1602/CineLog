/**
 * Request validation helpers for CineLog API
 */

export function validateTitleQuery(req, res, next) {
  const { type, page, limit, sort, mood } = req.query;

  if (type && !['all', 'movie', 'tv'].includes(type.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_TYPE_FILTER',
        message: 'Query parameter "type" must be one of: "all", "movie", "tv".'
      }
    });
  }

  if (page && (isNaN(Number(page)) || Number(page) < 1)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_PAGE',
        message: 'Query parameter "page" must be a positive integer.'
      }
    });
  }

  if (limit && (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_LIMIT',
        message: 'Query parameter "limit" must be an integer between 1 and 100.'
      }
    });
  }

  if (sort && !['featured', 'rating-desc', 'year-desc', 'title-asc'].includes(sort)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_SORT',
        message: 'Query parameter "sort" must be one of: "featured", "rating-desc", "year-desc", "title-asc".'
      }
    });
  }

  next();
}

export function validateWatchlistPost(req, res, next) {
  const { titleId } = req.body;

  if (!titleId || typeof titleId !== 'string' || titleId.trim() === '') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_TITLE_ID',
        message: 'Body field "titleId" is required and must be a non-empty string.'
      }
    });
  }

  req.body.titleId = titleId.trim();
  next();
}

export function validateSearchQuery(req, res, next) {
  const { q } = req.query;

  if (q !== undefined && typeof q !== 'string') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_SEARCH_QUERY',
        message: 'Search query "q" must be a string.'
      }
    });
  }

  next();
}
