'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function Home() {
  return (
    <Canvas>
      <OrbitControls makeDefault />

      <directionalLight color="white" intensity={1} position={[1, 2, 3]} />
      <ambientLight color="white" intensity={0.5} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </Canvas>
  );
}
