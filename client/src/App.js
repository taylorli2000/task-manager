import { Route, Switch } from "react-router-dom";
import { TaskProvider } from "./TaskProvider";
import SearchBar from "./SearchBar";
import TaskList from "./TaskList";
import Task from "./Task";

function App() {
  return (
    <div className="h-100 w-100 d-flex flex-column align-items-center">
      <Switch>
        <TaskProvider>
          <Route path="/task/:id">
            <Task />
          </Route>
          <Route exact path="/">
            <SearchBar />
            <TaskList />
          </Route>
        </TaskProvider>
      </Switch>
    </div>
  );
}

export default App;
