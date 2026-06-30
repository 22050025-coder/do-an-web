import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // C?p quy?n admin cho t?t c? user hi?n t?i
        await User.updateMany({}, { role: 'admin' });
        const adminUser = await User.findOne();

        // Xóa khóa h?c cu n?u có và thêm 3 khóa h?c m?u
        await Course.deleteMany({});
        await Course.insertMany([
            {
                title: 'L?p trình Node.js t? co b?n d?n nâng cao',
                description: 'Khóa h?c giúp b?n làm ch? Backend Node.js, Express và MongoDB.',
                price: 599000,
                instructor: adminUser._id,
                imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'ReactJS Masterclass 2026',
                description: 'Xây d?ng giao di?n Frontend tuy?t d?p v?i React và Redux Toolkit.',
                price: 850000,
                instructor: adminUser._id,
                imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Khóa h?c Ti?ng Anh Giao Ti?p IT',
                description: 'C?i thi?n k? nang m?m và Ti?ng Anh chuyên ngành IT d? ph?ng v?n.',
                price: 300000,
                instructor: adminUser._id,
                imageUrl: 'https://images.unsplash.com/photo-1546410531-ea0aca622616?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }
        ]);
        
        console.log('Ðã thêm 3 khóa h?c m?u thành công!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seed();
