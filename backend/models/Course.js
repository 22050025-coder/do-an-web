import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tiêu đề khóa học'],
    trim: true,
    maxlength: [100, 'Tiêu đề không quá 100 ký tự']
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả'],
  },
  price: {
    type: Number,
    required: [true, 'Vui lòng nhập giá khóa học'],
    default: 0
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  averageRating: {
    type: Number,
    default: 5.0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
