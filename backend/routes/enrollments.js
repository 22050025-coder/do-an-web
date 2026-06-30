import express from 'express';
import Enrollment from '../models/Enrollment.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Lấy danh sách khóa học user đã đăng ký
// @route   GET /api/enrollments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');
    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Lấy tất cả lượt ghi danh trên hệ thống (dành cho Admin)
// @route   GET /api/enrollments/all
// @access  Private/Admin
router.get('/all', protect, authorize('admin'), async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('user', 'name email')
      .populate('course', 'title price')
      .sort('-createdAt'); // Mới nhất lên đầu
    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
