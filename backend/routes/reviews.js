import express from 'express';
import { createReview, getCourseReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/:courseId', getCourseReviews);

export default router;
