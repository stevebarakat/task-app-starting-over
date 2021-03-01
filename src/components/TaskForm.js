import React, { useState, useContext } from 'react';
import { TasksContext } from '../context';


const TaskForm = () => {
  const { dispatch } = useContext(TasksContext);
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
    <form style={{display: "flex"}} onSubmit={handleSubmit}>
      <input 
        onChange={handleChange} 
        value={value} 
        type="text" 
        style={{width: "100%", padding: "0.25rem"}}  
      />
      <button type="submit">+</button>
    </form>
  );
};

export default TaskForm;
