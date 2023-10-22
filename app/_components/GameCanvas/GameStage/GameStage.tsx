import { Environment, OrbitControls, Plane } from '@react-three/drei';
import { ContributionGraph } from '../ContributionGraph';
import { PALETTE } from '@/app/_constants/palette';

export function GameStage() {
  return (
    <>
      <color args={[PALETTE.sky]} attach="background" />

      <Environment preset="forest" />

      <OrbitControls makeDefault />

      <ContributionGraph />

      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[45, -0.01, 45]}>
        <meshBasicMaterial color={PALETTE.land} />
      </Plane>
    </>
  );
}
