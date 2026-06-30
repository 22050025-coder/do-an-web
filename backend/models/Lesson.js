import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tiêu đề bài học'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Vui lòng nhập nội dung bài học'],
  },
  videoUrl: {
    type: String,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true
  },
  order: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

export default mongoose.model('Lesson', lessonSchema);
