/**
 * Prototype Visitor Authentication Middleware
 * 
 * NOTE: For prototype and discovery usage, CineLog uses client-supplied anonymous
 * visitor IDs (e.g., UUID or random string stored in browser localStorage).
 * Queries to watchlist are strictly scoped to this visitor ID.
 * 
 * In production environments, this would be replaced with JWT/Session-based
 * authentication with password hashing or OAuth2.
 */
export function requireVisitorId(req, res, next) {
  // Support either header 'x-visitor-id' or query/body fallback
  const visitorId = req.headers['x-visitor-id'] || req.query.visitorId || req.body?.visitorId;

  if (!visitorId || typeof visitorId !== 'string') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_VISITOR_ID',
        message: 'A valid visitor ID is required. Please provide it via the "x-visitor-id" header or "visitorId" query parameter.',
        documentation: 'https://github.com/cinelog/api#visitor-identification'
      }
    });
  }

  const trimmed = visitorId.trim();

  // Validate format (alphanumeric, hyphens, underscores, length 4-64)
  const isValidFormat = /^[a-zA-Z0-9_-]{4,64}$/.test(trimmed);
  if (!isValidFormat) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_VISITOR_ID',
        message: 'Visitor ID must be an alphanumeric string (including - or _) between 4 and 64 characters long.',
        provided: trimmed
      }
    });
  }

  // Attach sanitized visitor ID to request object
  req.visitorId = trimmed;
  next();
}
