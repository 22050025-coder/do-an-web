import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const setupAccounts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // 1. H? c?p t?t c? tài kho?n hi?n có (bao g?m Hu?nh Minh Chi?n) v? làm Khách hàng ('user')
        await User.updateMany({}, { role: 'user' });

        // 2. Xóa tài kho?n admin cu n?u có d? tránh l?i trùng l?p
        await User.deleteMany({ email: 'admin@gmail.com' });

        // 3. T?o m?t tài kho?n Admin chu?n
        await User.create({
            name: 'Qu?n Tr? Viên',
            email: 'admin@gmail.com',
            password: '123456', // M?t kh?u s? t? d?ng du?c mã hóa nh? Mongoose
            role: 'admin'
        });

        console.log('Thiet lap tai khoan thanh cong!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
setupAccounts();
