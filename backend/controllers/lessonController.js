import Lesson from '../models/Lesson.js';
import Course from '../models/Course.js';

// @desc    Lấy danh sách bài học của một khóa học
// @route   GET /api/courses/:courseId/lessons
// @access  Public
export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort('order');
    res.status(200).json({ success: true, count: lessons.length, data: lessons });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Tạo bài học mới
// @route   POST /api/courses/:courseId/lessons
// @access  Private/Admin
export const createLesson = async (req, res) => {
  try {
    req.body.course = req.params.courseId;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học' });
    }

    const lesson = await Lesson.create(req.body);

    res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Lấy chi tiết một bài học
// @route   GET /api/lessons/:id
// @access  Private
export const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });
    }

    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Cập nhật một bài học
// @route   PUT /api/lessons/:id
// @access  Private/Admin
export const updateLesson = async (req, res) => {
  try {
    let lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });
    }

    lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Xóa một bài học
// @route   DELETE /api/lessons/:id
// @access  Private/Admin
export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });
    }

    await lesson.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
