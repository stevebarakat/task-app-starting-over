import { useContext } from 'react';
import { TasksContext } from '../context';

const DELETE_BTN_WIDTH = 70;

const useSwipe = (info, taskId, index, order) => {
  const { state, dispatch } = useContext(TasksContext);

  dispatch({ type: "UPDATE_ORDER", payload: order });
  const dragDistance = info.offset.x;
  const velocity = info.velocity.x;
  const taskSwiped = state.tasks.filter((task) => task.id === taskId)[0];

  if (
    (dragDistance < 0 || velocity < -500) &&
    (dragDistance < -DELETE_BTN_WIDTH * 2 ||
      (taskSwiped.isSwiped && dragDistance < -DELETE_BTN_WIDTH - 10))
  ) {
    const newTasksList = state.tasks.filter((task) => task.id !== taskId);
    dispatch({ type: "UPDATE_TASKS", payload: newTasksList });
    dispatch({ type: "DELETE_TASK", payload: index });
  } else if (dragDistance > -DELETE_BTN_WIDTH && taskSwiped.isSwiped) {

    const newTasksList = state.tasks.map((item) => {
      if (item.id === taskId) {
        item.isSwiped = false;
      }
      return item;
    });
    dispatch({ type: "UPDATE_TASKS", payload: newTasksList });

  } else if (dragDistance < 0 && dragDistance <= -DELETE_BTN_WIDTH / 3) {
    const newTasksList = state.tasks.map((item) => {
      if (item.id === taskId) {
        item.isSwiped = true;
      } else {
        item.isSwiped = false;
      }

      return item;
    });

    dispatch({ type: "UPDATE_TASKS", payload: newTasksList });
  }
};

export default useSwipe;
