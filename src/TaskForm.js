import React, { useState, useContext } from 'react';
import { firestore } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { TasksContext } from './context';

const docRef = firestore.collection('tasklist').doc('tasks');

const TaskForm = () => {
  const { state, dispatch } = useContext(TasksContext);
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "ADD_TASK", payload: value });
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={value} type="text" />
      <button type="submit">+</button>
    </form>
  );
};

export default TaskForm;
