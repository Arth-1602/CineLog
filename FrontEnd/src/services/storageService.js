/**
 * LocalStorage Watchlist Service for CineLog
 */

const WATCHLIST_STORAGE_KEY = 'cinelog_watchlist_ids_v1';

export const storageService = {
  /**
   * Retrieves array of saved movie IDs from localStorage
   */
  getWatchlistIds() {
    try {
      const data = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('CineLog: Error reading watchlist from localStorage', e);
      return [];
    }
  },

  /**
   * Checks if an ID is in the watchlist
   */
  has(movieId) {
    const list = this.getWatchlistIds();
    return list.includes(movieId);
  },

  /**
   * Adds an ID to the watchlist
   */
  add(movieId) {
    try {
      const current = this.getWatchlistIds();
      if (!current.includes(movieId)) {
        const updated = [...current, movieId];
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('cinelog:watchlist_changed', { detail: updated }));
        return updated;
      }
      return current;
    } catch (e) {
      console.warn('CineLog: Error adding to watchlist', e);
      return this.getWatchlistIds();
    }
  },

  /**
   * Removes an ID from the watchlist
   */
  remove(movieId) {
    try {
      const current = this.getWatchlistIds();
      const updated = current.filter(id => id !== movieId);
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('cinelog:watchlist_changed', { detail: updated }));
      return updated;
    } catch (e) {
      console.warn('CineLog: Error removing from watchlist', e);
      return this.getWatchlistIds();
    }
  },

  /**
   * Toggles item in watchlist
   */
  toggle(movieId) {
    if (this.has(movieId)) {
      return this.remove(movieId);
    } else {
      return this.add(movieId);
    }
  },

  /**
   * Clears entire watchlist
   */
  clear() {
    try {
      localStorage.removeItem(WATCHLIST_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('cinelog:watchlist_changed', { detail: [] }));
      return [];
    } catch (e) {
      console.warn('CineLog: Error clearing watchlist', e);
      return [];
    }
  }
};
