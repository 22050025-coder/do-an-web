import express from 'express';
import { getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Lấy thông tin user (đã có bên auth nhưng có thể tách ra đây)
router.get('/profile', protect, getMe);

// Cập nhật thông tin user
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name: req.body.name
    }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
