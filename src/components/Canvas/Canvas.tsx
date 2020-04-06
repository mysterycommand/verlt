import './Canvas.css';

import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectBrowser } from '../../features/browser';

export const Canvas: FC = () => {
  const { dpr, width, height } = useSelector(selectBrowser);
  const w = width * dpr;
  const h = height * dpr;
  const s = 1 / dpr;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    contextRef.current = canvasRef.current.getContext('2d');

    if (!contextRef.current) {
      return;
    }

    contextRef.current.clearRect(0, 0, w, h);
    contextRef.current.font = '64px sans-serif';
    contextRef.current.textAlign = 'center';
    contextRef.current.textBaseline = 'middle';
    contextRef.current.fillText('verlt', w / 2, h / 2);
  }, [w, h]);

  return (
    <canvas
      ref={canvasRef}
      width={w}
      height={h}
      style={{ transform: `scale(${s})` }}
    />
  );
};
