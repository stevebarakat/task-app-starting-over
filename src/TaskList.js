import { useState, useEffect, useContext } from 'react';
import { firestore } from './firebase';
import { TasksContext } from './context';
const docRef = firestore.collection('tasklist').doc('tasks');

const TaskList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(TasksContext);

  useEffect(() => {
    return docRef.onSnapshot(snapshot => {
      if (!snapshot.data()) return;
      dispatch({ type: "UPDATE_TASKS", payload: snapshot.data().tasks });
      setIsLoading(false);
    });
  }, [dispatch]);
  console.log(state);
  return isLoading ? "...loading" :
    state.map(task => {
      return <li key={task.id}>{task.text}</li>;
    });
};

export default TaskList;
