import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  isComplete: boolean;
}

interface IInitialState {
  tasks: ITask[];
  filter: string;
}

type data = Pick<ITask, 'title' | 'description' | 'dueDate' | 'priority'>;

const initialState: IInitialState = {
  tasks: [],
  filter: 'all',
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<data>) => {
      const id = uuidv4();

      const taskObj = {
        ...action.payload,
        isComplete: false,
        id,
      };
      state.tasks.push(taskObj);
    },

    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      // state.tasks.forEach(task =>
      //         task.id === action.payload ? (task.isComplete = !task.isComplete) : task
      //       );

      const task = state.tasks.find(t => t.id === action.payload);

      if (task) {
        task.isComplete = !task.isComplete;
      }
    },

    updateFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const selectFilterTask = (state: RootState) => {
  const { filter, tasks } = state.todo;

  switch (filter) {
    case 'low':
    case 'medium':
    case 'high':
      return tasks.filter(task => task.priority === filter);

    case 'all':
    default:
      return tasks;
  }
};

export const { addTask, toggleTaskCompletion, updateFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
