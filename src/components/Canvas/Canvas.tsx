import './Canvas.css';

import React, { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectBrowser } from '../../features/browser';
import { addParticle, selectAll } from '../../features/particles';

const { PI: π } = Math;
const ππ = π * 2;

export const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const { dpr, width, height } = useSelector(selectBrowser);
  const w = width * dpr;
  const h = height * dpr;
  const s = 1 / dpr;

  const particles = useSelector(selectAll);
  const dispatch = useDispatch();

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

    particles.forEach((particle) => {
      if (!contextRef.current) {
        return;
      }

      contextRef.current.beginPath();
      contextRef.current.ellipse(
        particle.currPos[0],
        particle.currPos[1],
        20,
        20,
        0,
        0,
        ππ,
      );
      contextRef.current.stroke();
    });
  }, [w, h, particles]);

  return (
    <canvas
      ref={canvasRef}
      width={w}
      height={h}
      style={{ transform: `scale(${s})` }}
      onClick={(e) => {
        dispatch(
          addParticle({
            currPos: [e.clientX * dpr, e.clientY * dpr],
            prevPos: [e.clientX * dpr, e.clientY * dpr],
          }),
        );
      }}
    />
  );
};
