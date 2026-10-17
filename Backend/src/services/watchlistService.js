import mongoose from 'mongoose';
import { Watchlist } from '../models/Watchlist.js';
import { Title } from '../models/Title.js';
import { titleService } from './titleService.js';
import { isDbConnected } from '../config/db.js';

// In-Memory store for watchlist (visitorId -> Set of titleIds)
const inMemoryWatchlist = new Map();

export const watchlistService = {
  /**
   * Get all watchlist items for a specific visitor
   */
  async getWatchlist(visitorId) {
    if (isDbConnected()) {
      const items = await Watchlist.find({ visitorId })
        .populate('titleId')
        .sort({ createdAt: -1 })
        .lean();

      // Filter out any populated items where the title was deleted
      return items
        .filter(item => item.titleId)
        .map(item => ({
          id: item._id.toString(),
          visitorId: item.visitorId,
          createdAt: item.createdAt,
          title: {
            ...item.titleId,
            id: item.titleId._id.toString()
          }
        }));
    }

    // In-memory fallback
    const savedIds = inMemoryWatchlist.get(visitorId) || [];
    const results = [];
    for (const titleId of savedIds) {
      const title = await titleService.getTitleById(titleId);
      if (title) {
        results.push({
          id: `wl_${visitorId}_${titleId}`,
          visitorId,
          createdAt: new Date(),
          title
        });
      }
    }
    return results;
  },

  /**
   * Add a title to the visitor's watchlist
   */
  async addToWatchlist(visitorId, titleId) {
    // 1. Verify title exists
    const title = await titleService.getTitleById(titleId);
    if (!title) {
      const error = new Error(`Title with ID '${titleId}' was not found.`);
      error.statusCode = 404;
      throw error;
    }

    if (isDbConnected()) {
      try {
        const entry = await Watchlist.create({
          visitorId,
          titleId: title._id || title.id
        });

        return {
          id: entry._id.toString(),
          visitorId: entry.visitorId,
          titleId: entry.titleId.toString(),
          createdAt: entry.createdAt,
          title
        };
      } catch (err) {
        // Handle duplicate key error code 11000
        if (err.code === 11000) {
          const conflict = new Error('This title is already in your watchlist.');
          conflict.statusCode = 409;
          conflict.titleId = titleId;
          throw conflict;
        }
        throw err;
      }
    }

    // In-memory fallback
    const existing = inMemoryWatchlist.get(visitorId) || [];
    if (existing.includes(titleId)) {
      const conflict = new Error('This title is already in your watchlist.');
      conflict.statusCode = 409;
      conflict.titleId = titleId;
      throw conflict;
    }

    inMemoryWatchlist.set(visitorId, [titleId, ...existing]);

    return {
      id: `wl_${visitorId}_${titleId}`,
      visitorId,
      titleId,
      createdAt: new Date(),
      title
    };
  },

  /**
   * Remove a title from the visitor's watchlist
   */
  async removeFromWatchlist(visitorId, titleId) {
    if (isDbConnected()) {
      let queryTitleId = titleId;
      if (mongoose.Types.ObjectId.isValid(titleId)) {
        queryTitleId = new mongoose.Types.ObjectId(titleId);
      }

      const result = await Watchlist.findOneAndDelete({
        visitorId,
        titleId: queryTitleId
      });

      if (!result) {
        const error = new Error(`Title '${titleId}' not found in visitor's watchlist.`);
        error.statusCode = 404;
        throw error;
      }

      return {
        success: true,
        removedId: titleId
      };
    }

    // In-memory fallback
    const existing = inMemoryWatchlist.get(visitorId) || [];
    if (!existing.includes(titleId)) {
      const error = new Error(`Title '${titleId}' not found in visitor's watchlist.`);
      error.statusCode = 404;
      throw error;
    }

    inMemoryWatchlist.set(
      visitorId,
      existing.filter(id => id !== titleId)
    );

    return {
      success: true,
      removedId: titleId
    };
  }
};
