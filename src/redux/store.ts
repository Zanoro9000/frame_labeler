import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import { frameAPI } from './apis/frameApi';

export const appStore = configureStore({
  reducer: {
    app: appReducer,
    [frameAPI.reducerPath]: frameAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(frameAPI.middleware),
});

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
