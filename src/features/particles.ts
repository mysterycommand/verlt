import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { RootState } from './store';

type Vec2 = [number, number];

interface Particle {
  id: string;
  currPos: Vec2;
  prevPos: Vec2;
}

interface Physics {
  gravity: Vec2;
  friction: number;
  drag: number;
}

const {
  getInitialState,
  getSelectors,
  addOne,
  updateMany,
} = createEntityAdapter<Particle>();

export const {
  reducer,
  actions: { addParticle, updateParticles },
} = createSlice({
  name: 'particles',
  initialState: getInitialState<Physics>({
    gravity: [0, 1],
    friction: 0.8,
    drag: 0.99,
  }),
  reducers: {
    addParticle: {
      reducer: addOne,
      prepare: ({
        currPos,
        prevPos,
      }: Pick<Particle, 'currPos' | 'prevPos'>) => ({
        payload: {
          id: uuid(),
          currPos,
          prevPos,
        },
      }),
    },
    updateParticles: updateMany,
  },
});

export const selectParticles: (
  state: RootState,
) => EntityState<Particle> & Physics = (state) => state.particles;
export const { selectAll } = getSelectors(selectParticles);
