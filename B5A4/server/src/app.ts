import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import bookRoutes from './routes/book.route';
import borrowRoutes from './routes/borrow.route';

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

// endpoints
app.get('/', (req, res) => {
  res.send('📚 Library API is Running');
});

app.listen(port, () => {
  connectDB();
  console.log(`🚀 Server is running on port ${port}`);
});

export default app;
