import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import titleRoutes from './titleRoutes.js';
import searchRoutes from './searchRoutes.js';
import watchlistRoutes from './watchlistRoutes.js';

const apiRouter = Router();

apiRouter.use(healthRoutes);
apiRouter.use('/titles', titleRoutes);
apiRouter.use('/search', searchRoutes);
apiRouter.use('/watchlist', watchlistRoutes);

export default apiRouter;
