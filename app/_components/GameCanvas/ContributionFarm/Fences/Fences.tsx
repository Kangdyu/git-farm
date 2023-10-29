import * as THREE from 'three';
import { Clone, Merged, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MODEL } from '@/app/_constants/models';
import { GroupProps } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.Mesh;
  };
  materials: {
    wood: THREE.MeshStandardMaterial;
  };
};

// surround farm land with fences
export function Fences(props: GroupProps) {
  const fenceModel = useGLTF(MODEL.decoration.fence.modelUrl) as GLTFResult;

  return (
    <group {...props}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Clone
          key={index}
          object={fenceModel.scene}
          position={[-3, 0, -1.5 + 3 * index]}
          scale={3}
        />
      ))}

      {Array.from({ length: 19 }).map((_, index) => (
        <Clone
          key={index}
          object={fenceModel.scene}
          position={[-1 + 3 * index, 0, 9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={3}
        />
      ))}

      {Array.from({ length: 4 }).map((_, index) => (
        <Clone
          key={index}
          object={fenceModel.scene}
          position={[55, 0, -1.5 + 3 * index]}
          rotation={[0, Math.PI, 0]}
          scale={3}
        />
      ))}

      {Array.from({ length: 19 }).map((_, index) => (
        <Clone
          key={index}
          object={fenceModel.scene}
          position={[-1 + 3 * index, 0, -3]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={3}
        />
      ))}
    </group>
  );
}

useGLTF.preload(MODEL.decoration.fence.modelUrl);
