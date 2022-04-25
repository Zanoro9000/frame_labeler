import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { fetchImage, fetchImageMeta } from '../actionCreators.ts/appActions';
import type { RootState } from '../store';

export type Box = {
  x: number
  y: number
  w: number
  h: number
}

export type AppState = {
  frame: number,
  loading: boolean,
  error?: string,
  totalFrames: number,
  boxes: Record<number, Box[]>,
  images: Record<number, string>,
}

// Define the initial state using that type
const initialState: AppState = {
  frame: 0,
  loading: true,
  error: undefined,
  totalFrames: 0,
  boxes: { 0: [] },
  images: {}
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reset: () => initialState,    
    setFrame: (state, action: PayloadAction<number>) => {
      state.frame = Math.max(0 , Math.min(action.payload, state.totalFrames));
      if (!state.boxes[state.frame]) state.boxes[state.frame] = [];
      state.loading = true;
      state.error = undefined;
    }, 
    incrementFrame: (state) => {
      state.frame = Math.min(state.frame + 1, state.totalFrames);
      if (!state.boxes[state.frame]) state.boxes[state.frame] = [];
      state.loading = true;
      state.error = undefined;
    }, 
    decrementFrame: (state) => {
      state.frame = Math.max(state.frame - 1, 0);
      if (!state.boxes[state.frame]) state.boxes[state.frame] = []
      state.loading = true;
      state.error = undefined;
    }, 
    addBox: (state, action: PayloadAction<Box>) => {
      state.boxes[state.frame].push(action.payload)
    },    
    removeBox: (state, action: PayloadAction<number>) => {
      const boxes = state.boxes[state.frame]
      if (!!boxes && boxes.length > action.payload) {
        state.boxes[state.frame].splice(action.payload, 1)
      }
    }, 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImageMeta.fulfilled, (state, action) => {
      state.totalFrames = action.payload.frame_count - 1;
      state.loading = false;
    })
    builder.addCase(fetchImageMeta.rejected, (state, action) => {
      state.error = 'Unable to load meta';
      state.loading = false;
    })
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.images[state.frame] = action.payload;
      state.loading = false;
    })
    builder.addCase(fetchImage.rejected, (state, action) => {
      state.error = 'Unable to load image';
      state.loading = false;
    })
  }
});

export const {
  reset,
  setFrame,
  incrementFrame,
  decrementFrame,
  addBox,
  removeBox,
} = appSlice.actions;

export const useAppSelector = <T>(s: (a: AppState) => T) =>
  useSelector<RootState, T>((state) => s(state.app));

export default appSlice.reducer;
