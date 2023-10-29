import { MODEL } from '@/app/_constants/models';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';

export function Truck(props: GroupProps) {
  const truckModel = useGLTF(MODEL.decoration.truck.modelUrl);

  return (
    <group {...props}>
      <primitive object={truckModel.scene} scale={5} />
    </group>
  );
}
