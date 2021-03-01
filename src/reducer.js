import { v4 as uuidv4 } from "uuid";
import { findIndex } from "lodash";
import { firestore } from "./firebase";
const db = firestore;
const docRef = db.collection("tasklist").doc("tasks");

export default function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      };
      const addedTasks = [...state.tasks, newTask];
      docRef.set({ tasks: addedTasks });
      return {
        ...state,
        tasks: addedTasks
      };
    case "TOGGLE_TASK":
      const toggledTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : task
      );
      docRef.set({ tasks: toggledTasks });
      return {
        ...state,
        tasks: toggledTasks
      };
    case "SET_CURRENT_TASK":
      console.log(state);
      return {
        ...state,
        currentTask: action.payload
      };
    case "UPDATE_TASK":
      const tempTasks = state.tasks;
      const id = state.currentTask.id;
      const taskIndex = findIndex(state.tasks, { id });
      tempTasks[taskIndex].text = action.payload;
      console.log(tempTasks[taskIndex].text);
      docRef.set({ tasks: tempTasks });
      return {
        ...state,
        currentTask: [],
        tasks: tempTasks
      };
    case "UPDATE_TASKS":
      docRef.set({ tasks: action.payload });
      return {
        ...state,
        tasks: action.payload
      };
    case "UPDATE_ORDER": {
      docRef.set({ tasks: action.payload });
      return state;
    }
    case "DELETE_TASK":
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      docRef.set({ tasks: filteredTasks });
      return {
        ...state,
        tasks: filteredTasks
      };
    default:
      return state;
  }
}
