import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import tasks from './tasks/tasks.route.js';
import tasksDAO from './tasks/tasks.dao.js';
import tasksErrorHandler from './middleware/tasksErrorHandler.js';
import generalErrorHandler from './middleware/generalErrorHandler.js';
import errorLogger from './middleware/errorLogger.js';
import notFoundHandler from './middleware/notFoundHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', tasks);
app.use(errorLogger);
app.use(notFoundHandler);
app.use(tasksErrorHandler);
app.use(generalErrorHandler);

MongoClient.connect(process.env.TASK_MANAGER_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(async (client) => {
    await tasksDAO.injectDB(client);
  });

export default app;
