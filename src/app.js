import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import paperRoutes from './routes/paper.routes';
import { config } from './config/config';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(authMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/papers', paperRoutes);

// Database connection
mongoose.connect(config.database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app
export default app;