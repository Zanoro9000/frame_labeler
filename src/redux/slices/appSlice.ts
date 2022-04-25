import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export type Box = {
  x1: number
  x2: number
  y1: number
  y2: number
}

export type AppState = {
  frame: number,
  boundingBoxes: Record<number, Box[]>
}

// Define the initial state using that type
const initialState: AppState = {
  frame: 0,
  boundingBoxes: {}
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reset: () => initialState,    
    loadFrame: (state, action: PayloadAction<number>) => {
      state.frame = action.payload;
      if (!state.boundingBoxes[state.frame]) state.boundingBoxes[state.frame] = []
    }, 
    addBox: (state, action: PayloadAction<Box>) => {
      state.boundingBoxes[state.frame].push(action.payload)
    },    
  },
});

export const {
  reset
} = appSlice.actions;

export const useAppSelector = <T>(s: (a: AppState) => T) =>
  useSelector<RootState, T>((state) => s(state.app));

export default appSlice.reducer;
