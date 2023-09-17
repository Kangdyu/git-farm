'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession({ required: true });

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
