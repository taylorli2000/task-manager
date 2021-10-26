import { ObjectId } from "mongodb";
import Task from "./tasks.model.js";
import tasksError from "./tasks.error.js";

let tasks;

export default class tasksDAO {
  static injectDB = async (conn) => {
    if (tasks) {
      return;
    }
    try {
      tasks = await conn
        .db(process.env.TASK_MANAGER_DB_NS)
        .collection(process.env.TASK_MANAGER_COLLECTION_NS);
    } catch (err) {
      console.error(`Unable to establish collection handles in tasksDAO: ${e}`);
    }
  };
  static getAllTasks = async () => {
    const allTasks = await tasks.find().toArray();
    if (allTasks) {
      return allTasks;
    }
    throw new tasksError("Unable to get all tasks", 500);
  };
  static postTask = async (description) => {
    const taskDoc = new Task(description);
    const response = await tasks.insertOne(taskDoc);
    if (response.acknowledged) {
      return taskDoc;
    }
    throw new tasksError(`Unable to post task: ${taskDoc}`, 500);
  };
  static getTask = async (id) => {
    const response = await tasks.findOne({ _id: ObjectId(id) });
    if (response) {
      return response;
    }
    throw new tasksError(`No task with id: ${id}`, 404);
  };
  static patchTask = async (id, patches) => {
    const response = await tasks.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: patches },
      {
        returnDocument: "after",
      }
    );
    if (response.lastErrorObject.updatedExisting === true) {
      return response.value;
    }
    throw new tasksError(`No task with id: ${id}`, 404);
  };
  static deleteTask = async (id) => {
    const response = await tasks.deleteOne({ _id: ObjectId(id) });
    if (response.deletedCount === 1) {
      return true;
    }
    throw new tasksError(`No task with id: ${id}`, 404);
  };
}
