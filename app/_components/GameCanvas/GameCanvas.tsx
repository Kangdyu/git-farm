'use client';

import { Canvas } from '@react-three/fiber';
import { GameStage } from './GameStage';

export function GameCanvas() {
  return (
    <Canvas shadows>
      <GameStage />
    </Canvas>
  );
}
