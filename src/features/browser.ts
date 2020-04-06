import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Browser {
  dpr: number;
  width: number;
  height: number;
}

const {
  devicePixelRatio: dpr,
  innerWidth: width,
  innerHeight: height,
} = window;

export const {
  reducer,
  actions: { resize },
} = createSlice({
  name: 'browser',
  initialState: {
    dpr,
    width,
    height,
  },
  reducers: {
    resize(state) {
      const {
        devicePixelRatio: dpr,
        innerWidth: width,
        innerHeight: height,
      } = window;

      state.dpr = dpr;
      state.width = width;
      state.height = height;
    },
  },
});

export const selectBrowser: (state: RootState) => Browser = (state) =>
  state.browser;
