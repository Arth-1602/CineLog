import { Router } from 'express';
import { watchlistController } from '../controllers/watchlistController.js';
import { requireVisitorId } from '../middleware/visitorAuth.js';
import { validateWatchlistPost } from '../middleware/validation.js';

const router = Router();

// All watchlist routes require visitor identification scoping
router.use(requireVisitorId);

router.get('/', watchlistController.getWatchlist);
router.post('/', validateWatchlistPost, watchlistController.addToWatchlist);
router.delete('/:titleId', watchlistController.removeFromWatchlist);

export default router;
