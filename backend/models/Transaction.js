import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'purchase'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending'
  },
  description: {
    type: String
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course'
  }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
