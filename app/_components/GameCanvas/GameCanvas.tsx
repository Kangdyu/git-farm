'use client';

import { Canvas } from '@react-three/fiber';
import { GameStage } from './GameStage';
import { Fog } from 'three';
import { useControls } from 'leva';
import { Suspense, useRef } from 'react';
import { Loader } from '@react-three/drei';
import { PALETTE } from '@/app/_constants/palette';

export function GameCanvas() {
  const { color, near, far } = useControls('fog', {
    color: {
      value: '#e2ffee',
      onChange: (value) => {
        fogRef.current.color.set(value);
      },
      transient: false,
    },
    near: {
      value: 100,
      min: 0,
      max: 9999,
      step: 1,
      onChange: (value) => {
        fogRef.current.near = value;
      },
      transient: false,
    },
    far: {
      value: 200,
      min: 0,
      max: 9999,
      step: 1,
      onChange: (value) => {
        fogRef.current.far = value;
      },
      transient: false,
    },
  });

  const fogRef = useRef(new Fog(color, near, far));

  return (
    <>
      <Canvas
        shadows={true}
        scene={{
          fog: fogRef.current,
        }}
      >
        <Suspense fallback={null}>
          <GameStage />
        </Suspense>
      </Canvas>
      <Loader containerStyles={{ backgroundColor: PALETTE.sky }} dataStyles={{ color: 'black' }} />
    </>
  );
}
