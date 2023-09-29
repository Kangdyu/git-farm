'use client';

import { Canvas } from '@react-three/fiber';
import { GameStage } from './GameStage';

export function GameCanvas() {
  return (
    <Canvas
      camera={{
        position: [5.8, 0.9, 1.7],
      }}
      shadows
    >
      <GameStage />
    </Canvas>
  );
}
