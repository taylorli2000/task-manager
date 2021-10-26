import React, { useContext, useState, useEffect } from "react";

const TaskContext = React.createContext();
const BASE_URL = "http://localhost:8000/api";

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState();
  const [loaded, setLoaded] = useState(false);

  async function deleteTask(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.deleted) {
      const newTasks = tasks.filter((task) => task._id !== id);
      setLoaded(false);
      setTasks(newTasks);
      setLoaded(true);
    }
  }

  async function getTask(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    if (data.task) {
      return data.task;
    }
  }

  async function postTask(description) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(description),
    });
    const data = await response.json();
    if (data.task) {
      setLoaded(false);
      setTasks((previous) => [...previous, data.task]);
      setLoaded(true);
    }
  }

  async function patchTask(id, changes) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });
    const data = await response.json();
    if (data.task) {
      const newTask = tasks.reduce((prev, curr, i) => {
        if (curr._id === id) {
          prev.push(i);
          prev.push(curr);
        }
        return prev;
      }, []);
      newTask[1].description = changes.description;
      newTask[1].complete = changes.complete;
      const newTasks = tasks;
      newTasks.splice(newTask[0], 1, newTask[1]);
      setLoaded(false);
      setTasks(newTasks);
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
        setLoaded(true);
      });
  }, []);

  const value = { tasks, deleteTask, getTask, postTask, patchTask };

  return (
    <TaskContext.Provider value={value}>
      {loaded && children}
    </TaskContext.Provider>
  );
}
