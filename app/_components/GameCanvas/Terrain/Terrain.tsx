import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MODEL } from '@/app/_constants/models';
import { PALETTE } from '@/app/_constants/palette';

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
  };
  materials: {};
};

export function Terrain(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF(MODEL.decoration.terrain.modelUrl) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} scale={12.48}>
        <meshStandardMaterial color={PALETTE.land} />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL.decoration.terrain.modelUrl);
