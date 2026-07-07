import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route files
import auth from './routes/auth.js';
import courses from './routes/courses.js';
import users from './routes/users.js';
import enrollments from './routes/enrollments.js';
import lessonRouter from './routes/lessons.js';
import transactionRouter from './routes/transactions.js';
import reviewRouter from './routes/reviews.js';
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/enrollments', enrollments);
app.use('/api/lessons', lessonRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/reviews', reviewRouter);

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running correctly',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
