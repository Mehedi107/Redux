import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '@/store/features/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
