import express from 'express';
import authRoutes from './routes/auth.routes.js';
import paperRoutes from './routes/paper.routes.js';

const app = express();

// Middlewares globais
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/papers', paperRoutes);

export default app;