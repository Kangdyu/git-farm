import { Pin } from '@/app/_components/UserInterface/Pin';
import { MODEL } from '@/app/_constants/models';
import { Html, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { IconCar } from '@tabler/icons-react';

export function Truck(props: GroupProps) {
  const truckModel = useGLTF(MODEL.decoration.truck.modelUrl);

  return (
    <group {...props}>
      <primitive object={truckModel.scene} scale={5} />
      <Html position={[-2, 12, 0]}>
        <Pin>
          <IconCar size={36} color="white" />
        </Pin>
      </Html>
    </group>
  );
}
