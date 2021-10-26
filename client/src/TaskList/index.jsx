import { useHistory } from "react-router-dom";
import { useTasks } from "../TaskProvider";

export default function TaskList() {
  const { tasks, deleteTask } = useTasks();
  const history = useHistory();

  const handleDelete = (id) => {
    deleteTask(id);
  };

  const handleGetTask = (id) => {
    history.push(`/task/${id}`);
  };

  return (
    <div className="rounded border border-muted border-4 my-5 d-flex flex-column align-items-center flex-grow-1 w-75">
      {tasks.map((task, i) => {
        return (
          <div
            key={i}
            className="d-flex mb-3 w-100"
            role="group"
            aria-label="Task buttons"
          >
            <button
              type="button"
              className="btn btn-outline-primary flex-grow-1 me-2 py-3"
              onClick={() => {
                handleGetTask(task._id);
              }}
            >
              {task.description}
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                handleDelete(task._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
