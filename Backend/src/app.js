import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/env.js';
import apiRouter from './routes/index.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin || config.corsOrigins.includes(origin) || config.corsOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error(`Origin '${origin}' not permitted by CORS policy.`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-visitor-id']
  })
);

// HTTP request logging (suppressed during automated testing)
if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Apply rate limiting to all /api routes
app.use('/api', apiRateLimiter);

// Mount master API routes
app.use('/api', apiRouter);

// Root greeting & status redirect
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'CineLog REST API',
    tagline: 'Discover your next obsession.',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      health: 'GET /api/health',
      titles: 'GET /api/titles',
      titleDetails: 'GET /api/titles/:id',
      search: 'GET /api/search?q=...',
      watchlist: 'GET /api/watchlist',
      addToWatchlist: 'POST /api/watchlist',
      removeFromWatchlist: 'DELETE /api/watchlist/:titleId'
    }
  });
});

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

export default app;
