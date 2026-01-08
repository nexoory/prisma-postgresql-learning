import express, { Router } from 'express';

import TaskRouter from './routes/task.route';

const app = express();

app.use(express.json());

const api = Router();

api.use('/tasks', TaskRouter());

app.use('/api', api);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

export default app;
