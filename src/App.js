import { useReducer } from 'react';
import { TasksContext } from './context';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import tasksReducer from './tasksReducer';
import './styles/reset.css';
import './styles/global.css';

function App() {
  const [state, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      <div style={{width: "333px", margin: "0 auto", boxShadow: "0px 2px 3px #999"}}>
        <h1>TaskApp (starting over)</h1>
        <TaskForm/>
        <TaskList/>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
