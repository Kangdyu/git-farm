import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { MODEL } from '@/app/_constants/models';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';

export function House(props: GroupProps) {
  const {
    user: { buildingLevel },
  } = useUser();
  const houseLevel = `level${buildingLevel}` as keyof (typeof MODEL)['house'];
  const houseModel = useGLTF(MODEL.house[houseLevel].modelUrl);

  return (
    <group {...props}>
      <primitive object={houseModel.scene} />
    </group>
  );
}
