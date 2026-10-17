/**
 * CineLog Centralized API Client
 * Connects frontend React components to the Express REST API backend.
 */

const STORAGE_VISITOR_KEY = 'cinelog_visitor_id';

/**
 * Retrieves or generates an anonymous, persistent visitor ID.
 * Scopes watchlist queries without requiring mandatory user registration.
 */
export function getVisitorId() {
  let visitorId = localStorage.getItem(STORAGE_VISITOR_KEY);
  if (!visitorId || !/^[a-zA-Z0-9_-]{4,64}$/.test(visitorId)) {
    // Generate a clean, compliant unique visitor ID
    visitorId = `v_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(STORAGE_VISITOR_KEY, visitorId);
  }
  return visitorId;
}

/**
 * Returns API base URL from Vite environment or falls back to /api proxy
 */
export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return '/api';
}

/**
 * Normalizes title record from backend to support both frontend and backend property conventions
 */
export function normalizeTitle(title) {
  if (!title) return null;
  return {
    ...title,
    id: title.id || title._id?.toString(),
    posterUrl: title.posterPath || title.posterUrl || '',
    backdropUrl: title.backdropPath || title.backdropUrl || '',
    moods: title.moodTags || title.moods || [],
    genres: title.genres || []
  };
}

/**
 * Centralized fetch wrapper with headers, visitor ID, and error handling
 */
async function apiRequest(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    'x-visitor-id': getVisitorId(),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = data?.error?.message || `Request failed with status ${res.status}`;
      const error = new Error(errorMessage);
      error.status = res.status;
      error.code = data?.error?.code || 'API_ERROR';
      error.details = data?.error;
      throw error;
    }

    return data;
  } catch (err) {
    // Distinguish network connection failures
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error('Cannot connect to CineLog Backend API. Please verify the server is running on port 5001.');
      netError.status = 503;
      netError.code = 'BACKEND_OFFLINE';
      throw netError;
    }
    throw err;
  }
}

export const api = {
  getVisitorId,
  getApiBaseUrl,

  /**
   * Health check endpoint
   */
  async checkHealth() {
    return apiRequest('/health');
  },

  /**
   * List titles with optional filters and pagination
   */
  async getTitles(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page);
    if (params.limit) query.set('limit', params.limit);
    if (params.type && params.type !== 'all') query.set('type', params.type);
    if (params.genre && params.genre !== 'All Genres') query.set('genre', params.genre);
    if (params.language && params.language !== 'All Languages') query.set('language', params.language);
    if (params.mood) query.set('mood', params.mood);
    if (params.sort) query.set('sort', params.sort);

    const queryString = query.toString();
    const endpoint = `/titles${queryString ? `?${queryString}` : ''}`;
    const result = await apiRequest(endpoint);

    return {
      ...result,
      data: (result.data || []).map(normalizeTitle)
    };
  },

  /**
   * Fetch single title details by ID
   */
  async getTitleById(id) {
    if (!id) throw new Error('Title ID is required');
    const result = await apiRequest(`/titles/${id}`);
    return normalizeTitle(result.data);
  },

  /**
   * Search titles by text query and filters
   */
  async searchTitles(params = {}) {
    const query = new URLSearchParams();
    if (params.query !== undefined) query.set('q', params.query);
    if (params.type && params.type !== 'all') query.set('type', params.type);
    if (params.genre && params.genre !== 'All Genres') query.set('genre', params.genre);
    if (params.language && params.language !== 'All Languages') query.set('language', params.language);
    if (params.mood) query.set('mood', params.mood);
    if (params.page) query.set('page', params.page);
    if (params.limit) query.set('limit', params.limit);

    const endpoint = `/search?${query.toString()}`;
    const result = await apiRequest(endpoint);

    return {
      ...result,
      data: (result.data || []).map(normalizeTitle)
    };
  },

  /**
   * Retrieve current visitor's watchlist
   */
  async getWatchlist() {
    const result = await apiRequest('/watchlist');
    return {
      ...result,
      data: (result.data || []).map(item => ({
        ...item,
        title: normalizeTitle(item.title)
      }))
    };
  },

  /**
   * Add a title to current visitor's watchlist
   */
  async addToWatchlist(titleId) {
    if (!titleId) throw new Error('titleId is required');
    const result = await apiRequest('/watchlist', {
      method: 'POST',
      body: JSON.stringify({ titleId })
    });
    return {
      ...result,
      data: {
        ...result.data,
        title: normalizeTitle(result.data?.title)
      }
    };
  },

  /**
   * Remove a title from current visitor's watchlist
   */
  async removeFromWatchlist(titleId) {
    if (!titleId) throw new Error('titleId is required');
    return apiRequest(`/watchlist/${titleId}`, {
      method: 'DELETE'
    });
  }
};
