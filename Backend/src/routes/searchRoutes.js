import { Router } from 'express';
import { searchController } from '../controllers/searchController.js';
import { validateSearchQuery } from '../middleware/validation.js';

const router = Router();

router.get('/', validateSearchQuery, searchController.search);

export default router;
