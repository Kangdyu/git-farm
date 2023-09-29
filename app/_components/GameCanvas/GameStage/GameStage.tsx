import { Center, OrbitControls, Plane } from '@react-three/drei';
import { ContributionGraph } from '../ContributionGraph';
import { useFrame } from '@react-three/fiber';

export function GameStage() {
  useFrame(({ camera }) => {
    console.log(camera.position, camera.rotation);
  });
  return (
    <>
      <color args={['#f5aa58']} attach="background" />

      <OrbitControls makeDefault />

      <directionalLight color="white" intensity={1} position={[1, 4, 3]} />
      <ambientLight color="white" intensity={0.5} />

      <Center scale={0.1}>
        <ContributionGraph />
      </Center>

      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.01, 2]}>
        <meshBasicMaterial color="#9b7653" />
      </Plane>
    </>
  );
}
