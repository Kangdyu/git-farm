import { MODEL } from '@/app/_constants/models';
import { PALETTE } from '@/app/_constants/palette';
import { Circle, Clone, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';

export function TableSet(props: GroupProps) {
  const tableModel = useGLTF(MODEL.decoration.table.modelUrl);
  const chairModel = useGLTF(MODEL.decoration.chair.modelUrl);
  const treeModel = useGLTF(MODEL.decoration.tree2.modelUrl);

  return (
    <group {...props}>
      <Circle args={[10]} rotation={[-Math.PI / 2, 0, 0]} position-y={0}>
        <meshStandardMaterial color={PALETTE.dirt} />
      </Circle>

      <Clone
        object={tableModel.scene}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={3}
      />

      <Clone
        object={chairModel.scene}
        position={[-5, 0, -2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={3}
      />
      <Clone
        object={chairModel.scene}
        position={[-5, 0, 2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={3}
      />

      <Clone
        object={chairModel.scene}
        position={[5, 0, -2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={3}
      />
      <Clone
        object={chairModel.scene}
        position={[5, 0, 2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={3}
      />

      <Clone object={treeModel.scene} position={[-3, 0, -6]} />
    </group>
  );
}
