import { MODEL } from '@/app/_constants/models';
import { useGLTF } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTF } from 'three-stdlib';
import { Mesh } from 'three/src/Three.js';

type GLTFResult = GLTF & {
  nodes: {
    WindMill001: THREE.Mesh;
    WindMill: THREE.Mesh;
  };
  materials: {
    Farm_Pack_001: THREE.MeshStandardMaterial;
  };
};

export function Windmill(props: GroupProps) {
  const { nodes, materials } = useGLTF(MODEL.decoration.windmill.modelUrl) as GLTFResult;
  const rockModel = useGLTF(MODEL.decoration.rock.modelUrl);
  const windbladeRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!windbladeRef.current) return;
    windbladeRef.current.rotation.z += delta;
  });

  return (
    <group {...props}>
      <group scale={15}>
        <mesh
          ref={windbladeRef}
          geometry={nodes.WindMill001.geometry}
          material={materials.Farm_Pack_001}
          position={[0.008, 1.901, 0.171]}
          scale={0.482}
        />
        <mesh
          geometry={nodes.WindMill.geometry}
          material={materials.Farm_Pack_001}
          position={[0.018, 1.565, 0.078]}
          scale={0.482}
        />
      </group>

      <primitive
        object={rockModel.scene}
        position={[7, 1, 0]}
        rotation-y={-Math.PI / 2}
        scale={10}
      />
    </group>
  );
}
