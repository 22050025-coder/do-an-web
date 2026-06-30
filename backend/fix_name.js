import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
dotenv.config();

const fixName = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const adminUser = await User.findOne({ email: 'admin@gmail.com' });
        if (adminUser) {
            adminUser.name = 'Quản Trị Viên';
            await adminUser.save();
            console.log('Fixed admin name');
        }
        process.exit(0);
    } catch(err) { console.error(err); process.exit(1); }
}
fixName();
