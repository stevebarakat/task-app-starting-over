import { useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase';
import { TasksContext } from '../context';
import {usePositionReorder} from '../hooks/usePositionReorder';
import TaskItem from './TaskItem';

const docRef = firestore.collection('tasklist').doc('tasks');

const TaskList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(TasksContext);
  const [order, updatePosition, updateOrder] = usePositionReorder(state.tasks, dispatch);

  useEffect(() => {
    return docRef.onSnapshot(snapshot => {
      if (!snapshot.data()) return;
      dispatch({ type: "UPDATE_TASKS", payload: snapshot.data().tasks });
      setIsLoading(false);
    });
  }, [dispatch]);
  return isLoading ? "...loading" :
    <ul>
      {order.map((task, i) => <TaskItem
        key={task.text}
        i={i}
        task={task}
        order={order}
        updatePosition={updatePosition}
        updateOrder={updateOrder}
      />)}
    </ul>;
};

export default TaskList;
