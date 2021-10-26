import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTasks } from "../TaskProvider";

export default function Task() {
  const [task, setTask] = useState();
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const { deleteTask, getTask, patchTask } = useTasks();
  const history = useHistory();
  const descriptionRef = useRef();
  const completeRef = useRef();

  const handleCloseTask = () => {
    history.push("/");
  };

  const handleDeleteTask = () => {
    deleteTask(task._id);
    handleCloseTask();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      task.description !== descriptionRef.current.value ||
      task.complete !== completeRef.current.checked
    ) {
      patchTask(task._id, {
        description: descriptionRef.current.value,
        complete: completeRef.current.checked,
      });
      handleCloseTask();
    }
  };

  useEffect(() => {
    getTask(id).then((response) => {
      setTask(response);
      setLoaded(true);
    });
  }, [getTask, id]);

  return (
    <div className="rounded border border-primary border-4 my-auto p-2">
      {loaded && (
        <div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleCloseTask}
          ></button>
          <form onSubmit={handleSubmit} className="h-100 px-5 py-2 mt-2">
            <input
              className="form-control"
              type="text"
              value={`Id: ${task._id}`}
              aria-label="Disabled input example"
              disabled
              readOnly
            />
            <div className="input-group my-3">
              <span className="input-group-text" id="TaskDescription">
                Task:
              </span>
              <input
                type="text"
                className="form-control"
                defaultValue={task.description}
                placeholder={task.description}
                aria-label="Description"
                aria-describedby="TaskDescription"
                ref={descriptionRef}
              />
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="complete"
                defaultChecked={task.complete}
                ref={completeRef}
              />
              <label className="form-check-label" htmlFor="complete">
                Complete
              </label>
            </div>
            <div className="text-end" role="group" aria-label="Task buttons">
              <button type="submit" className="btn btn-success me-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteTask}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
