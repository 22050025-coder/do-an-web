import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const adminUser = await User.findOne({ role: 'admin' });

        await Course.deleteMany({});
        await Course.insertMany([
            {
                title: 'Lập trình Node.js từ cơ bản đến nâng cao',
                description: 'Khóa học giúp bạn làm chủ Backend Node.js, Express và MongoDB.',
                price: 599000,
                instructor: adminUser._id,
                imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'ReactJS Masterclass 2026',
                description: 'Xây dựng giao diện Frontend tuyệt đẹp với React và Redux Toolkit.',
                price: 850000,
                instructor: adminUser._id,
                imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Khóa học Tiếng Anh Giao Tiếp IT',
                description: 'Cải thiện kỹ năng mềm và Tiếng Anh chuyên ngành IT để phỏng vấn.',
                price: 300000,
                instructor: adminUser._id,
                imageUrl: 'https://images.unsplash.com/photo-1546410531-ea0aca622616?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }
        ]);
        
        console.log('Seed OK!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seed();
