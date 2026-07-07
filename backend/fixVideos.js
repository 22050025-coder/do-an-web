import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Lesson from './models/Lesson.js';
import Course from './models/Course.js';

dotenv.config();

// Mảng chứa các ID video YouTube công khai luôn hoạt động tốt
const workingVideoIds = [
  'W6NZfCO5SIk', // JS Crash Course
  'Ke90Tje7VS0', // React Crash Course
  'ZvwWeGgCEUU', // Python
  'PkZNo7MF68', // CSS
  'kUMe1lyzzb8'  // HTML
];

const fixVideos = async () => {
  try {
    console.log('Đang kết nối Database để sửa Video...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Kết nối thành công! Đang quét các bài học...');

    const lessons = await Lesson.find({});
    let updatedCount = 0;

    for (let lesson of lessons) {
      // Dù video cũ là gì, ta thay bằng video ngẫu nhiên trong list trên để đảm bảo 100% chạy được
      const randomVideoId = workingVideoIds[Math.floor(Math.random() * workingVideoIds.length)];
      lesson.videoUrl = `https://www.youtube.com/embed/${randomVideoId}`;
      await lesson.save();
      updatedCount++;
    }

    // Tiện thể sửa cả videoUrl ở Course (nếu có)
    const courses = await Course.find({});
    for (let course of courses) {
        if (course.videoUrl) {
            const randomVideoId = workingVideoIds[Math.floor(Math.random() * workingVideoIds.length)];
            course.videoUrl = `https://www.youtube.com/embed/${randomVideoId}`;
            await course.save();
        }
    }

    console.log(`🎉 Đã sửa thành công URL Video cho ${updatedCount} bài học!`);
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

fixVideos();
