import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { reducer as browser } from './browser';

export const store = configureStore({
  reducer: {
    browser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
