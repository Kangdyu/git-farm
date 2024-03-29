/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 public/models/decorations/chair.gltf -t 
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MODEL } from '@/app/_constants/models';

type GLTFResult = GLTF & {
  nodes: {
    chair: THREE.Mesh;
  };
  materials: {
    ['BrownDark.052']: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>;

export function Chair(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(MODEL.decoration.chair.modelUrl) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.chair.geometry} material={materials['BrownDark.052']} castShadow />
    </group>
  );
}

useGLTF.preload(MODEL.decoration.chair.modelUrl);
