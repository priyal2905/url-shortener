import express, { Application } from 'express';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import shortenerRoutes from './routes/shortener.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app: Application = express();

app.use(express.json());
app.use('/', healthRoutes);
app.use('/', authRoutes);
app.use('/', shortenerRoutes);
app.use(errorHandler);

export default app;