import { ContributionFarm } from '../ContributionFarm';
import { House } from '../House';
import { Terrain } from '../Terrain';
import { TableSet } from '../TableSet';
import { Windmill } from '@/app/_components/GameCanvas/Windmill';

export function GameStage() {
  return (
    <>
      <Terrain position={[0, -0.01, 0]} scale={15} />

      <House scale={20} position={[0, 0, -10]} />
      <ContributionFarm position={[-25, 0, 27]} />
      <TableSet position={[-25, 0, 5]} />
      <Windmill position={[30, 0, 5]} rotation-y={-Math.PI / 2} />
    </>
  );
}
