import express from 'express';
import { getLessons, getLesson, createLesson, updateLesson, deleteLesson } from '../controllers/lessonController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true }); // Để có thể nhận params từ route cha (courseId)

router.route('/')
  .get(getLessons)
  .post(protect, authorize('admin'), createLesson);

router.route('/:id')
  .get(protect, getLesson) // Tạm thời bắt buộc đăng nhập mới xem được nội dung chi tiết bài học
  .put(protect, authorize('admin'), updateLesson)
  .delete(protect, authorize('admin'), deleteLesson);

export default router;
