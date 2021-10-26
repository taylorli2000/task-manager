import { Router } from 'express';
import tasksController from './tasks.controller.js';

const tasksRouter = Router();

tasksRouter
  .route('/')
  .get(tasksController.apiGetAllTasks)
  .post(tasksController.apiPostTask);
tasksRouter
  .route('/:id')
  .get(tasksController.apiGetTask)
  .patch(tasksController.apiPatchTask)
  .delete(tasksController.apiDeleteTask);

export default tasksRouter;
