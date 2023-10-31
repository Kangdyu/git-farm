/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 public/models/decorations/fence.gltf -t 
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MODEL } from '@/app/_constants/models';

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.Mesh;
  };
  materials: {
    fence: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>;

export function Fence(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(MODEL.decoration.fence.modelUrl) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube001.geometry} material={materials.fence} castShadow />
    </group>
  );
}

useGLTF.preload(MODEL.decoration.fence.modelUrl);
