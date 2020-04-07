import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { reducer as browser, selectBrowser } from './browser';
import {
  reducer as particles,
  selectParticles,
  selectAll,
  updateParticles,
} from './particles';

export const store = configureStore({
  reducer: {
    browser,
    particles,
  },
});

const { /* hypot, */ min } = Math;
/* const hypot2 = (...args: number[]) =>
  args.reduce((acc, arg) => acc + arg * arg, 0); */

export const tick: () => AppThunk = () => (dispatch, getState) => {
  const { dpr, height } = selectBrowser(getState());
  const { gravity, /* friction, */ drag } = selectParticles(getState());

  dispatch(
    updateParticles(
      selectAll(getState()).map(({ id, currPos, prevPos }) => {
        const currVel = [
          (currPos[0] - prevPos[0]) * drag,
          (currPos[1] - prevPos[1]) * drag,
        ];

        if (
          currPos[1] >=
          height * dpr - 20 /* && hypot2(...currVel) > 0.000001 */
        ) {
          currVel[1] *= -1;

          // const length = hypot(...currVel);
          // currVel[0] /= length;
          // currVel[1] /= length;

          // currVel[0] *= friction;
          // currVel[1] *= friction;
        }

        return {
          id,
          changes: {
            prevPos: currPos,
            currPos: [
              currPos[0] + currVel[0] + gravity[0],
              min(currPos[1] + currVel[1] + gravity[1], height * dpr - 20),
            ],
          },
        };
      }),
    ),
  );
};

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
