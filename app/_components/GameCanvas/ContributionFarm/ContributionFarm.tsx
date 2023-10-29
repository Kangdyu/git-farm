import { Clone, Plane, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';

import { PALETTE } from '@/app/_constants/palette';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { MODEL } from '@/app/_constants/models';
import { Fences } from './Fences';

export function ContributionFarm(props: GroupProps) {
  const { user } = useUser();

  const crop = user.farm!.item.name as keyof (typeof MODEL)['crop'];
  const cropModel = useGLTF(MODEL.crop[crop].modelUrl);

  const bucketModel = useGLTF(MODEL.decoration.bucket.modelUrl);

  return (
    <group {...props}>
      <Plane args={[55, 8]} rotation={[-Math.PI / 2, 0, 0]} position={[26, 0.01, 3]} receiveShadow>
        <meshStandardMaterial color={PALETTE.farmland} />
      </Plane>

      <Fences />

      <Clone object={bucketModel.scene} position={[0, 1.2, -5]} scale={3} />

      {user.contributionCalendar
        .split(',')
        .map((count, index) =>
          Number(count) === 0 ? null : (
            <Clone
              key={index}
              object={cropModel.scene}
              position={[Math.floor(index / 7), 0, index % 7]}
              castShadow
              scale={1}
            />
          )
        )}
    </group>
  );
}
