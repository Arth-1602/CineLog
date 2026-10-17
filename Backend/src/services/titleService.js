import mongoose from 'mongoose';
import { Title } from '../models/Title.js';
import { SAMPLE_TITLES } from '../data/sampleTitles.js';
import { isDbConnected } from '../config/db.js';

// Helper to escape user input before constructing RegExp
function escapeRegex(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// In-Memory store fallback when MongoDB daemon is not running
let inMemoryTitles = SAMPLE_TITLES.map((t, idx) => {
  const num = (idx + 1) < 99 ? (idx + 1) : (idx + 2);
  const idStr = `66400000000000000000${num.toString().padStart(4, '0')}`;
  return {
    ...t,
    _id: new mongoose.Types.ObjectId(idStr),
    id: idStr,
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

export const titleService = {
  /**
   * Seed initial sample data into database if empty
   */
  async seedInitialTitles() {
    if (!isDbConnected()) return;
    try {
      const count = await Title.countDocuments();
      if (count === 0) {
        console.log('[Seeder] Populating database with sample cinematic records...');
        await Title.insertMany(SAMPLE_TITLES);
        console.log(`[Seeder] Successfully seeded ${SAMPLE_TITLES.length} titles.`);
      }
    } catch (err) {
      console.warn('[Seeder] Auto-seed warning:', err.message);
    }
  },

  /**
   * List titles with filters, pagination, and sorting
   */
  async getTitles({
    page = 1,
    limit = 12,
    type,
    genre,
    language,
    mood,
    sort = 'featured'
  } = {}) {
    page = Math.max(1, parseInt(page, 10) || 1);
    limit = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (page - 1) * limit;

    if (isDbConnected()) {
      const query = {};
      if (type && type !== 'all') query.type = type.toLowerCase();
      if (genre && genre !== 'All Genres') query.genres = genre;
      if (language && language !== 'All Languages') query.language = new RegExp(`^${escapeRegex(language)}$`, 'i');
      if (mood) query.moodTags = mood.toLowerCase();

      let sortOption = {};
      switch (sort) {
        case 'rating-desc':
          sortOption = { rating: -1, voteCount: -1 };
          break;
        case 'year-desc':
          sortOption = { releaseYear: -1 };
          break;
        case 'title-asc':
          sortOption = { title: 1 };
          break;
        case 'featured':
        default:
          sortOption = { featured: -1, rating: -1, releaseYear: -1 };
          break;
      }

      const [docs, total] = await Promise.all([
        Title.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
        Title.countDocuments(query)
      ]);

      const formatted = docs.map(d => ({
        ...d,
        id: d._id.toString()
      }));

      return {
        data: formatted,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      };
    }

    // In-Memory Fallback
    let filtered = [...inMemoryTitles];
    if (type && type !== 'all') {
      filtered = filtered.filter(t => t.type === type.toLowerCase());
    }
    if (genre && genre !== 'All Genres') {
      filtered = filtered.filter(t => t.genres?.includes(genre));
    }
    if (language && language !== 'All Languages') {
      filtered = filtered.filter(t => t.language?.toLowerCase() === language.toLowerCase());
    }
    if (mood) {
      filtered = filtered.filter(t => t.moodTags?.includes(mood.toLowerCase()));
    }

    switch (sort) {
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'year-desc':
        filtered.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
        break;
    }

    const total = filtered.length;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    };
  },

  /**
   * Fetch single title details by ID
   */
  async getTitleById(id) {
    if (isDbConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      const title = await Title.findById(id).lean();
      if (!title) return null;
      return {
        ...title,
        id: title._id.toString()
      };
    }

    // In-memory fallback
    const title = inMemoryTitles.find(t => t.id === id || t._id.toString() === id);
    return title ? { ...title } : null;
  },

  /**
   * Search titles by text query and filters
   */
  async searchTitles({
    query = '',
    type,
    genre,
    language,
    mood,
    page = 1,
    limit = 12
  } = {}) {
    page = Math.max(1, parseInt(page, 10) || 1);
    limit = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (page - 1) * limit;
    const q = query.trim();

    if (isDbConnected()) {
      const filter = {};
      if (q) {
        // Regex search across title, synopsis, director and cast for natural matching
        const safeRegex = new RegExp(escapeRegex(q), 'i');
        filter.$or = [
          { title: safeRegex },
          { synopsis: safeRegex },
          { director: safeRegex },
          { cast: safeRegex }
        ];
      }

      if (type && type !== 'all') filter.type = type.toLowerCase();
      if (genre && genre !== 'All Genres') filter.genres = genre;
      if (language && language !== 'All Languages') filter.language = new RegExp(`^${language}$`, 'i');
      if (mood) filter.moodTags = mood.toLowerCase();

      const [docs, total] = await Promise.all([
        Title.find(filter).sort({ rating: -1, releaseYear: -1 }).skip(skip).limit(limit).lean(),
        Title.countDocuments(filter)
      ]);

      const formatted = docs.map(d => ({
        ...d,
        id: d._id.toString()
      }));

      return {
        query: q,
        data: formatted,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      };
    }

    // In-memory search fallback
    let results = inMemoryTitles.filter(t => {
      if (q) {
        const lowerQ = q.toLowerCase();
        const matchesTitle = t.title?.toLowerCase().includes(lowerQ);
        const matchesSynopsis = t.synopsis?.toLowerCase().includes(lowerQ);
        const matchesDirector = t.director?.toLowerCase().includes(lowerQ);
        const matchesCast = t.cast?.some(c => c.toLowerCase().includes(lowerQ));
        if (!matchesTitle && !matchesSynopsis && !matchesDirector && !matchesCast) {
          return false;
        }
      }

      if (type && type !== 'all' && t.type !== type.toLowerCase()) return false;
      if (genre && genre !== 'All Genres' && !t.genres?.includes(genre)) return false;
      if (language && language !== 'All Languages' && t.language?.toLowerCase() !== language.toLowerCase()) return false;
      if (mood && !t.moodTags?.includes(mood.toLowerCase())) return false;

      return true;
    });

    results.sort((a, b) => {
      if (q) {
        const lowerQ = q.toLowerCase();
        const aTitle = a.title?.toLowerCase() || '';
        const bTitle = b.title?.toLowerCase() || '';
        const aScore = aTitle === lowerQ ? 4 : (aTitle.startsWith(lowerQ) ? 3 : (aTitle.includes(lowerQ) ? 2 : 1));
        const bScore = bTitle === lowerQ ? 4 : (bTitle.startsWith(lowerQ) ? 3 : (bTitle.includes(lowerQ) ? 2 : 1));
        if (aScore !== bScore) return bScore - aScore;
      }
      return b.rating - a.rating;
    });
    const total = results.length;
    const paginated = results.slice(skip, skip + limit);

    return {
      query: q,
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    };
  }
};
