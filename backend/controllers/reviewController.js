import Review from '../models/Review.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

// @desc    Tạo đánh giá mới cho khóa học
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { rating, comment, courseId } = req.body;
    const userId = req.user.id;

    // Kiểm tra khóa học tồn tại
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học' });
    }

    // Kiểm tra xem user đã mua khóa học chưa (Trừ khi là Admin)
    if (req.user.role !== 'admin') {
      const isEnrolled = await Enrollment.findOne({ user: userId, course: courseId });
      if (!isEnrolled) {
        return res.status(403).json({ success: false, message: 'Bạn cần mua khóa học này mới có thể đánh giá' });
      }
    }

    // Kiểm tra xem user đã đánh giá khóa học này chưa
    const alreadyReviewed = await Review.findOne({ user: userId, course: courseId });
    if (alreadyReviewed) {
      // Nếu đã đánh giá, thì cập nhật lại đánh giá cũ
      alreadyReviewed.rating = rating;
      alreadyReviewed.comment = comment;
      await alreadyReviewed.save();
      
      // Tính toán lại averageRating cho khóa học
      const reviews = await Review.find({ course: courseId });
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      course.averageRating = Number((totalRating / reviews.length).toFixed(1));
      course.reviewCount = reviews.length;
      await course.save();

      return res.status(200).json({ success: true, data: alreadyReviewed, message: 'Cập nhật đánh giá thành công' });
    }

    // Tạo đánh giá mới
    const review = await Review.create({
      rating,
      comment,
      course: courseId,
      user: userId
    });

    // Tính toán lại averageRating cho khóa học
    const reviews = await Review.find({ course: courseId });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    course.averageRating = Number((totalRating / reviews.length).toFixed(1));
    course.reviewCount = reviews.length;
    await course.save();

    res.status(201).json({ success: true, data: review, message: 'Thêm đánh giá thành công' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Lấy tất cả đánh giá của 1 khóa học
// @route   GET /api/reviews/:courseId
// @access  Public
export const getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ course: req.params.courseId })
      .populate({ path: 'user', select: 'name' })
      .sort('-createdAt');

    // Tính điểm trung bình
    let avgRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      avgRating = (totalRating / reviews.length).toFixed(1);
    }

    res.status(200).json({ 
      success: true, 
      count: reviews.length, 
      avgRating, 
      data: reviews 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
