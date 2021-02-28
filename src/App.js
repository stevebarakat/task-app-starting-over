import { useReducer } from 'react';
import { TasksContext } from './context';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import tasksReducer from './reducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      <div>
        <TaskForm/>
        <TaskList/>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
