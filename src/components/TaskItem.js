import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useMeasurePosition } from '../hooks/useMeasurePosition';
import { TasksContext } from '../context';

const DELETE_BTN_WIDTH = 70;

const TaskItem = ({ i, updateOrder, updatePosition, order, task }) => {
  const { state, dispatch } = useContext(TasksContext);
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));
  const [isDragging, setIsDragging] = useState(false);

  function handleDragEnd(info, taskId, index) {
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
  }

  return (
    <div style={{ position: "relative" }}>
      <motion.li
        key={task.id}
        ref={ref}
        drag
        dragDirectionLock
        layout="position"
        initial={false}
        dragPropagation={true}
        dragConstraints={{
          top: 0,
          bottom: 0,
          left: task.isSwiped ? DELETE_BTN_WIDTH * -1 : 0,
          right: 0
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          handleDragEnd(info, task.id, i);
        }}
        onViewportBoxUpdate={(_, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}
        whileTap={{ cursor: "grabbing" }}
        whileHover={{ cursor: "grab" }}
        animate={{ x: task.isSwiped ? DELETE_BTN_WIDTH * -1 : 0 }}
        style={{
          zIndex: isDragging ? 9 : 1,
          position: "relative",
          border: "1px solid #dedede",
          background: "white",
          padding: "0.75rem",
          height: "25px"
        }}
      >
        <input
          onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task })}
          type="checkbox"
          checked={task.complete}
        />
        <span
          contentEditable
          suppressContentEditableWarning
          onFocus={() => dispatch({ type: "SET_CURRENT_TASK", payload: task })}
          onBlur={e => dispatch({ type: "UPDATE_TASK", payload: e.currentTarget.innerText })}
          style={task.complete ?
            { textDecoration: "line-through" } :
            { textDecoration: "none" }}
        >{task.text}</span>
      </motion.li>
      <button
        onClick={() => dispatch({ type: "DELETE_TASK", payload: task })}
        style={{
          padding: "0.75rem",
          position: "absolute",
          border: "none",
          background: "red",
          color: "white",
          fontWeight: "bold",
          right: "0px",
          top: "1px",
          height: "50px",
          width: "70px"
        }}
      >Delete</button>
    </div>
  );
};

export default TaskItem;
