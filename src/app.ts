import express, { Application } from 'express';
import healthRoutes from './routes/health.routes';
import { config } from './config/env';

const app: Application = express();

app.use(express.json());
app.use('/', healthRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;