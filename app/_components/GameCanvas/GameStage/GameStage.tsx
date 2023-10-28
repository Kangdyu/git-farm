import { EnvironmentProps, OrbitControls, Plane, Stage } from '@react-three/drei';
import { useControls } from 'leva';

import { PALETTE } from '@/app/_constants/palette';

import { ContributionFarm } from '../ContributionFarm';

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
          args={[100, 100]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <meshStandardMaterial color={PALETTE.land} />
        </Plane>

        <ContributionFarm position={[-20, 0, -20]} />
      </Stage>
    </>
  );
}
