import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Enrollment from './models/Enrollment.js';

dotenv.config();

const cleanEnrollments = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Enrollment.deleteMany({});
        console.log('Cleared all enrollments');
        process.exit();
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}
cleanEnrollments();
