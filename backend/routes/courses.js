import express from 'express';
import { getCourses, getCourse, createCourse, enrollCourse, checkEnrollment } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/auth.js';

import lessonRouter from './lessons.js';

const router = express.Router();

// Re-route vào resource router khác
router.use('/:courseId/lessons', lessonRouter);

router.route('/')
  .get(getCourses)
  .post(protect, authorize('admin'), createCourse);

router.route('/:id')
  .get(getCourse);

router.route('/:id/enroll')
  .get(protect, checkEnrollment)
  .post(protect, enrollCourse);

export default router;
