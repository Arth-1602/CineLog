import { Router } from 'express';
import { titleController } from '../controllers/titleController.js';
import { validateTitleQuery } from '../middleware/validation.js';

const router = Router();

router.get('/', validateTitleQuery, titleController.getTitles);
router.get('/:id', titleController.getTitleById);

export default router;
