import { OrbitControls, Plane, Stage } from '@react-three/drei';
import { useControls } from 'leva';

import { PALETTE } from '@/app/_constants/palette';

import { ContributionFarm } from '../ContributionFarm';
import { House } from '../House';

export function GameStage() {
  // const { environment, preset, intensity } = useControls({
  //   environment: {
  //     value: 'warehouse',
  //     options: [
  //       'city',
  //       'dawn',
  //       'forest',
  //       'night',
  //       'sunset',
  //       'apartment',
  //       'lobby',
  //       'park',
  //       'studio',
  //       'warehouse',
  //     ],
  //   },
  //   preset: {
  //     value: 'rembrandt',
  //     options: ['rembrandt', 'portrait', 'upfront', 'soft'],
  //   },
  //   intensity: {
  //     value: 0,
  //     min: 0,
  //     max: 1,
  //     step: 0.1,
  //   },
  // });

  return (
    <>
      <color args={[PALETTE.sky]} attach="background" />

      <OrbitControls makeDefault />

      <Stage shadows={false} environment={'warehouse'} preset={'rembrandt'} intensity={0}>
        <Plane
          args={[150, 150]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <meshStandardMaterial color={PALETTE.land} />
        </Plane>

        <ContributionFarm position={[-10, 0, -30]} />

        <House rotation={[0, Math.PI / 2, 0]} position={[-30, 0, 10]} />
      </Stage>
    </>
  );
}
