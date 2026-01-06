import express from 'express';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.status(404);
});

export { app };
