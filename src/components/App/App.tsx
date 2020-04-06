import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { resize } from '../../features/browser';
import { on, off } from '../../lib/events';

import { Canvas } from '../Canvas';

const { requestAnimationFrame: raf, cancelAnimationFrame: caf } = window;

export const App: FC = () => {
  const dispatch = useDispatch();

  const [shouldResize, setShouldResize] = useState(false);
  useEffect(() => {
    const onResize = () => {
      setShouldResize(true);
    };

    on(window, 'resize', onResize);
    return () => off(window, 'resize', onResize);
  }, []);

  useEffect(() => {
    let frameId = -1;

    const onFrame = () => {
      frameId = raf(onFrame);

      if (shouldResize) {
        dispatch(resize());
        setShouldResize(false);
      }

      // dispatch(tick(t))
    };

    frameId = raf(onFrame);
    return () => caf(frameId);
  }, [shouldResize, dispatch]);

  return <Canvas />;
};
