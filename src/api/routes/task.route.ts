import { Router } from 'express';

const TaskRouter = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.status(200).json({ message: 'ok' });
  });

  return router;
};

export default TaskRouter;
