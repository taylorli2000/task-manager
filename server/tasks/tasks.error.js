export default class tasksError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
