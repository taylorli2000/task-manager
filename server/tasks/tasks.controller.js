import tasksDAO from "./tasks.dao.js";

export default class tasksController {
  static apiGetAllTasks = async (req, res, next) => {
    try {
      const response = await tasksDAO.getAllTasks();
      return res.status(200).json({ tasks: response });
    } catch (err) {
      return next(err);
    }
  };
  static apiPostTask = async (req, res, next) => {
    try {
      const description = req.body.description;
      const response = await tasksDAO.postTask(description);
      return res.status(200).json({ task: response });
    } catch (err) {
      return next(err);
    }
  };
  static apiGetTask = async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await tasksDAO.getTask(id);
      return res.status(200).json({ task: response });
    } catch (err) {
      return next(err);
    }
  };
  static apiPatchTask = async (req, res, next) => {
    try {
      const id = req.params.id;
      const patches = req.body;
      const response = await tasksDAO.patchTask(id, patches);
      return res.status(200).json({ task: response });
    } catch (err) {
      return next(err);
    }
  };
  static apiDeleteTask = async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await tasksDAO.deleteTask(id);
      return res.status(200).json({ deleted: response });
    } catch (err) {
      return next(err);
    }
  };
}
