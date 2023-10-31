'use client';

import { Canvas } from '@react-three/fiber';
import { GameStage } from './GameStage';
import { Suspense } from 'react';
import { Environment, Loader, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PALETTE } from '@/app/_constants/palette';

export function GameCanvas() {
  return (
    <>
      <Canvas shadows>
        <fog attach="fog" args={[PALETTE.fog, 100, 200]} />
        <color args={[PALETTE.sky]} attach="background" />
        <Environment preset={'lobby'} />

        <directionalLight
          color="white"
          intensity={1.5}
          position={[10, 30, 10]}
          castShadow
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-50, 50, 50, -50, 1, 1000]} />
        </directionalLight>

        <PerspectiveCamera makeDefault position={[-40, 25, 60]} />
        <OrbitControls
          makeDefault
          minDistance={30}
          maxDistance={100}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />

        <Suspense fallback={null}>
          <GameStage />
        </Suspense>
      </Canvas>
      <Loader containerStyles={{ backgroundColor: PALETTE.sky }} dataStyles={{ color: 'black' }} />
    </>
  );
}
