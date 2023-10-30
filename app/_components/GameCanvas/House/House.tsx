import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { Pin } from '@/app/_components/UserInterface/Pin/Pin';
import { MODEL } from '@/app/_constants/models';
import { Html, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { IconHome } from '@tabler/icons-react';

export function House(props: GroupProps) {
  const {
    user: { buildingLevel },
  } = useUser();
  const houseLevel = `level${buildingLevel}` as keyof (typeof MODEL)['house'];
  const houseModel = useGLTF(MODEL.house[houseLevel].modelUrl);

  return (
    <group {...props}>
      <primitive object={houseModel.scene} />
      <Html position={[0, 1.5, 0]} zIndexRange={[0, 0]}>
        <Pin>
          <IconHome size={36} color="white" />
        </Pin>
      </Html>
    </group>
  );
}
