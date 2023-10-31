import { Chair } from '@/app/_components/GameCanvas/models/Chair';
import { Table } from '@/app/_components/GameCanvas/models/Table';
import { LimeTree } from '@/app/_components/GameCanvas/models/LimeTree';
import { PALETTE } from '@/app/_constants/palette';
import { Circle } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';

export function TableSet(props: GroupProps) {
  return (
    <group {...props}>
      <Circle args={[10]} rotation={[-Math.PI / 2, 0, 0]} position-y={0} receiveShadow>
        <meshStandardMaterial color={PALETTE.dirt} />
      </Circle>

      <Table position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={3} />

      <Chair position={[-5, 0, -2]} rotation={[0, Math.PI / 2, 0]} scale={3} />
      <Chair position={[-5, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={3} />

      <Chair position={[5, 0, -2]} rotation={[0, -Math.PI / 2, 0]} scale={3} />
      <Chair position={[5, 0, 2]} rotation={[0, -Math.PI / 2, 0]} scale={3} />

      <LimeTree position={[-3, 0, -6]} />
    </group>
  );
}
