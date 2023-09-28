'use client';

import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ContributionGraph } from '../ContributionGraph';

export function GameCanvas() {
  return (
    <Canvas>
      <OrbitControls makeDefault />

      <directionalLight color="white" intensity={1} position={[1, 2, 3]} />
      <ambientLight color="white" intensity={0.5} />

      <Center scale={0.1}>
        <ContributionGraph />
      </Center>
    </Canvas>
  );
}
