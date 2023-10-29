import { OrbitControls, Plane, Stage } from '@react-three/drei';
import { useControls } from 'leva';

import { PALETTE } from '@/app/_constants/palette';

import { ContributionFarm } from '../ContributionFarm';
import { House } from '../House';

export function GameStage() {
  const { environment, preset, intensity, shadowColor, shadowOpacity } = useControls({
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

      <OrbitControls makeDefault />

      <Plane args={[500, 500]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -9.5, 0]}>
        <meshBasicMaterial color={PALETTE.land} />
      </Plane>

      <Stage
        shadows={{ type: 'contact', color: shadowColor, opacity: shadowOpacity }}
        environment={environment as any}
        preset={preset as any}
        intensity={intensity}
      >
        <ContributionFarm position={[-10, 0, -30]} />

        <House rotation={[0, Math.PI / 2, 0]} position={[-30, 0, 10]} />
      </Stage>
    </>
  );
}
