import { Router } from 'express';
import { createReview, deleteReview } from '../controllers/review.controller';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protectRoute);

router.post('/', createReview);
router.delete('/:id', deleteReview);

export default router;