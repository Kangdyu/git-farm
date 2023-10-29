import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';

import { PALETTE } from '@/app/_constants/palette';

import { ContributionFarm } from '../ContributionFarm';
import { House } from '../House';
import { Terrain } from '../Terrain';
import { TableSet } from '../TableSet';
import { Windmill } from '@/app/_components/GameCanvas/Windmill';

export function GameStage() {
  const { environment, preset, intensity, shadowColor, shadowOpacity } = useControls('stage', {
    environment: {
      value: 'lobby',
      options: [
        'city',
        'dawn',
        'forest',
        'night',
        'sunset',
        'apartment',
        'lobby',
        'park',
        'studio',
        'warehouse',
      ],
    },
    preset: {
      value: 'rembrandt',
      options: ['rembrandt', 'portrait', 'upfront', 'soft'],
    },
    intensity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    shadowColor: {
      value: '#cccccc',
    },
    shadowOpacity: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  return (
    <>
      <color args={[PALETTE.sky]} attach="background" />
      <Environment preset={environment as any} />
      <PerspectiveCamera makeDefault position={[-40, 25, 60]} />
      <directionalLight color="white" intensity={0.5} position={[1, 2, 3]} castShadow />
      <OrbitControls
        makeDefault
        minDistance={30}
        maxDistance={100}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />

      <Terrain position={[0, -0.01, 0]} scale={15} receiveShadow />

      <House scale={20} position={[0, 0, -10]} castShadow />
      <ContributionFarm position={[-25, 0, 27]} />
      <TableSet position={[-25, 0, 5]} />
      <Windmill position={[30, 0, 5]} rotation-y={-Math.PI / 2} />
    </>
  );
}
