'use client';

import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ContributionGraph } from './ContributionGraph';

export function GameCanvas() {
  return (
    <Canvas shadows>
      <color args={['#f5aa58']} attach="background" />

      <OrbitControls makeDefault />

      <directionalLight color="white" intensity={1} position={[1, 4, 3]} />
      <ambientLight color="white" intensity={0.5} />

      <Center scale={0.1}>
        <ContributionGraph />
      </Center>
    </Canvas>
  );
}
