import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// @desc    Lấy tất cả khóa học
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: 'instructor',
      select: 'name'
    });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Lấy 1 khóa học
// @route   GET /api/courses/:id
// @access  Public
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'instructor',
      select: 'name'
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học' });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Tạo khóa học mới
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req, res) => {
  try {
    // Gán user hiện tại làm instructor
    req.body.instructor = req.user.id;

    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Đăng ký tham gia khóa học (Mua khóa học bằng ví)
// @route   POST /api/courses/:id/enroll
// @access  Private
export const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    // Kiểm tra khóa học tồn tại
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học' });
    }

    // Kiểm tra đã đăng ký chưa
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ success: false, message: 'Bạn đã đăng ký khóa học này rồi' });
    }

    // Kiểm tra số dư ví
    const user = await User.findById(userId);
    if (user.balance < course.price) {
      return res.status(400).json({ success: false, message: `Số dư ví không đủ. Cần thêm ${course.price - user.balance}đ để mua khóa học này.` });
    }

    // Trừ tiền
    user.balance -= course.price;
    await user.save();

    // Ghi lại lịch sử giao dịch mua khóa học
    await Transaction.create({
      user: userId,
      amount: course.price,
      type: 'purchase',
      status: 'completed',
      description: `Mua khóa học: ${course.title}`,
      course: courseId
    });

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId
    });

    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Kiểm tra trạng thái đăng ký khóa học
// @route   GET /api/courses/:id/enroll
// @access  Private
export const checkEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ user: req.user.id, course: req.params.id });
    if (enrollment) {
      return res.status(200).json({ success: true, isEnrolled: true, data: enrollment });
    }
    res.status(200).json({ success: true, isEnrolled: false });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
