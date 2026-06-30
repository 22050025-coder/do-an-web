import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Lesson from './models/Lesson.js';

dotenv.config();

const lessonsData = {
    'Lập trình Node.js từ cơ bản đến nâng cao': [
        {
            title: 'Bài 1: Cài đặt Node.js và NPM',
            videoUrl: 'https://www.youtube.com/watch?v=kYV1JzB_vjQ',
            content: 'Hướng dẫn chi tiết cách tải và cài đặt Node.js trên Windows/Mac.\n\nTham khảo:\n- https://nodejs.org\n- Kiểm tra phiên bản: node -v',
            order: 1
        },
        {
            title: 'Bài 2: Express Framework cơ bản',
            videoUrl: 'https://www.youtube.com/watch?v=SccSCuHhOw0',
            content: 'Giới thiệu về Express.js, cách khởi tạo server và xử lý các route đơn giản.',
            order: 2
        }
    ],
    'ReactJS Masterclass 2026': [
        {
            title: 'Bài 1: Khởi tạo dự án React',
            videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            content: 'Sử dụng Vite để tạo dự án ReactJS thế hệ mới nhất.\n\nLệnh: npm create vite@latest',
            order: 1
        },
        {
            title: 'Bài 2: Components và Props',
            videoUrl: 'https://www.youtube.com/watch?v=cla1NbwzGKs',
            content: 'Hiểu về cách chia nhỏ giao diện thành các Component độc lập và truyền dữ liệu bằng Props.',
            order: 2
        },
        {
            title: 'Bài 3: Quản lý State với useState',
            videoUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
            content: 'Cách sử dụng React Hooks để lưu trữ trạng thái của ứng dụng.',
            order: 3
        }
    ],
    'Khóa học Tiếng Anh Giao Tiếp IT': [
        {
            title: 'Bài 1: Từ vựng chuyên ngành cơ bản',
            videoUrl: 'https://www.youtube.com/watch?v=U2XEJF0O8h8',
            content: 'Tổng hợp các từ vựng thường gặp khi làm việc trong môi trường công nghệ thông tin.',
            order: 1
        }
    ]
};

const seedLessons = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected.');

        await Lesson.deleteMany({});
        console.log('Đã xóa dữ liệu bài học cũ.');

        const courses = await Course.find();
        
        for (let course of courses) {
            let specificLessons = lessonsData[course.title];
            if (!specificLessons) {
                specificLessons = [
                    {
                        title: 'Bài giới thiệu',
                        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        content: 'Nội dung đang được cập nhật...',
                        order: 1
                    }
                ];
            }

            console.log(`Đang thêm bài học cho khóa: ${course.title}`);
            const lessonsToInsert = specificLessons.map(lesson => ({
                ...lesson,
                course: course._id
            }));
            await Lesson.insertMany(lessonsToInsert);
        }

        console.log('Thêm bài học mẫu THÀNH CÔNG!');
        process.exit();
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}
seedLessons();
