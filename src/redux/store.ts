import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import appReducer from './slices/appSlice';

export const appStore = configureStore({
  reducer: {
    app: appReducer,
  },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
