import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const courses = await Course.find();
        console.log(courses.map(c => c._id.toString()));
        process.exit();
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}
check();
