import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import User from './models/User.js';

dotenv.config();

const newCourses = [
  {
    title: 'Lập trình React Native Thực chiến (App Mobile)',
    description: 'Khóa học giúp bạn nắm vững React Native từ cơ bản đến nâng cao. Xây dựng 5 ứng dụng thực tế và đẩy lên App Store & Google Play.',
    price: 1500000,
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc'
  },
  {
    title: 'Master Python & Khoa học Dữ liệu 2026',
    description: 'Từ số không trở thành chuyên gia Data Science. Thành thạo Python, Pandas, Numpy và Machine Learning cơ bản trong 3 tháng.',
    price: 1200000,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc'
  },
  {
    title: 'UI/UX Design cho Lập trình viên',
    description: 'Không cần khiếu thẩm mỹ, vẫn có thể thiết kế giao diện đẹp. Học Figma và các nguyên tắc phối màu, bố cục hiện đại nhất.',
    price: 850000,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU'
  }
];

const seedData = async () => {
  try {
    console.log('Đang kết nối Database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Kết nối thành công!');

    // Tìm một admin làm giảng viên
    const admin = await User.findOne({ role: 'admin' });
    
    let instructorId = null;
    if (admin) {
      instructorId = admin._id;
    } else {
      console.log('⚠️ Không tìm thấy admin. Hãy tạo tài khoản admin trước!');
      process.exit(1);
    }

    console.log('Đang thêm 3 khóa học mới...');
    for (let course of newCourses) {
      course.instructor = instructorId;
      await Course.create(course);
    }

    console.log('🎉 Đã thêm thành công 3 khóa học cực xịn!');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

seedData();
