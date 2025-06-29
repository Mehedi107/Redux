import { createSlice } from '@reduxjs/toolkit';

interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface IInitialState {
  task: ITask[];
}

const initialState: IInitialState = {
  task: [
    {
      id: 'sdfsdgg',
      title: 'sgagf',
      description: 'gioehgiej',
      dueDate: '25-01-2026',
      isComplete: false,
      priority: 'medium',
    },
    {
      id: 'sdfsdgg',
      title: 'sgagf',
      description: 'gioehgiej',
      dueDate: '25-01-2026',
      isComplete: false,
      priority: 'medium',
    },
  ],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
