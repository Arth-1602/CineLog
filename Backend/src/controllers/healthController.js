import { isDbConnected } from '../config/db.js';
import { config } from '../config/env.js';

export const healthController = {
  getHealth(req, res) {
    const dbStatus = isDbConnected() ? 'connected' : 'in-memory-fallback';

    res.status(200).json({
      success: true,
      status: 'healthy',
      service: 'CineLog REST API',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.nodeEnv,
      database: {
        status: dbStatus,
        driver: isDbConnected() ? 'MongoDB / Mongoose' : 'Resilient In-Memory Store'
      },
      tmdbIntegration: {
        configured: Boolean(config.tmdb.apiKey)
      }
    });
  }
};
