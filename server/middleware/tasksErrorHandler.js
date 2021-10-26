import tasksError from '../tasks/tasks.error.js';

const tasksErrorHandler = (err, req, res, next) => {
  if (err instanceof tasksError) {
    return res.status(err.status).json({ error: err.message });
  }
  return next(err);
};

export default tasksErrorHandler;
