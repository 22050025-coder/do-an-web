import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Lesson from './models/Lesson.js';

dotenv.config();

const lessonsData = {
  'Lập trình React Native Thực chiến (App Mobile)': [
    { title: 'Chương 1: Giới thiệu React Native & Setup môi trường', content: 'Cài đặt Node, Watchman, React Native CLI và Android Studio.', videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc', order: 1 },
    { title: 'Chương 2: Thành phần cơ bản (View, Text, Image)', content: 'Làm quen với các component cốt lõi của React Native.', videoUrl: 'https://www.youtube.com/embed/Hf4MJH0jDb4', order: 2 },
    { title: 'Chương 3: State, Props & Hook (Thực hành)', content: 'Quản lý trạng thái ứng dụng bằng Hook trong React Native.', videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc', order: 3 },
  ],
  'Master Python & Khoa học Dữ liệu 2026': [
    { title: 'Bài 1: Cài đặt Python & Jupyter Notebook', content: 'Chuẩn bị môi trường lập trình tối ưu cho Data Science.', videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc', order: 1 },
    { title: 'Bài 2: Thao tác dữ liệu với Pandas & Numpy', content: 'Các thư viện thần thánh giúp xử lý hàng triệu dòng dữ liệu.', videoUrl: 'https://www.youtube.com/embed/WGJJIrtnfpk', order: 2 },
    { title: 'Bài 3: Trực quan hóa dữ liệu bằng Matplotlib', content: 'Vẽ biểu đồ và phân tích dữ liệu trực quan.', videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc', order: 3 },
  ],
  'UI/UX Design cho Lập trình viên': [
    { title: 'Phần 1: Nguyên lý thị giác cơ bản', content: 'Quy tắc 60-30-10, Khoảng trắng, và Hệ thống Lưới (Grid).', videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU', order: 1 },
    { title: 'Phần 2: Sử dụng Figma từ A-Z', content: 'Làm chủ công cụ thiết kế phổ biến nhất hiện nay.', videoUrl: 'https://www.youtube.com/embed/Gu1so3pz4bA', order: 2 },
    { title: 'Phần 3: Auto Layout & Component trong Figma', content: 'Thiết kế thông minh, tái sử dụng và dễ bảo trì.', videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU', order: 3 },
  ]
};

const seedLessons = async () => {
  try {
    console.log('Đang kết nối Database để thêm Đề cương...');
    await mongoose.connect(process.env.MONGO_URI);
    
    // Xóa các lesson cũ của các khóa này nếu có (tránh duplicate khi chạy nhiều lần)
    // Nhưng để an toàn ta chỉ thêm mới
    
    for (const [courseTitle, lessons] of Object.entries(lessonsData)) {
      const course = await Course.findOne({ title: courseTitle });
      
      if (course) {
        console.log(`Đang tạo bài học cho khóa: ${courseTitle}...`);
        for (let lesson of lessons) {
          lesson.course = course._id;
          
          // Kiểm tra xem bài học đã tồn tại chưa để tránh lặp
          const existingLesson = await Lesson.findOne({ course: course._id, title: lesson.title });
          if (!existingLesson) {
             await Lesson.create(lesson);
          }
        }
      } else {
        console.log(`Không tìm thấy khóa học: ${courseTitle}`);
      }
    }

    console.log('🎉 Đã thêm thành công Đề cương & Video cho 3 khóa học!');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

seedLessons();
