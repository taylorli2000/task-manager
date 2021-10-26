import React, { useRef } from "react";
import { useTasks } from "../TaskProvider";
import "./index.css";

export default function SearchBar() {
  const description = useRef();
  const { postTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    postTask({ description: description.current.value });
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="TaskDescription"
              placeholder="Task Description"
              required
              ref={description}
            />
            <label htmlFor="TaskDescription">Create a new task</label>
          </div>
          <button className="btn btn-primary" type="submit">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
