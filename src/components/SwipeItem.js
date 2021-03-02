import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useMeasurePosition } from '../hooks/useMeasurePosition';
import { useSwipe } from '../hooks/useSwipe';
import { TasksContext } from '../context';

const DELETE_BTN_WIDTH = 70;

const TaskItem = ({ i, updateOrder, updatePosition, order, task }) => {
  const { dispatch } = useContext(TasksContext);
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));
  const [isDragging, setIsDragging] = useState(false);
  const [dragInfo, setDragInfo] = useState(null);
  useSwipe(dragInfo, task.id, i, order);

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
          setDragInfo(info);
          dispatch({ type: "UPDATE_ORDER", payload: order });
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
