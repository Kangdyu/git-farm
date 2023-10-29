import { ContributionFarm } from '../ContributionFarm';
import { House } from '../House';
import { Terrain } from '../Terrain';
import { TableSet } from '../TableSet';
import { Windmill } from '../Windmill';
import { Truck } from '../Truck';

export function GameStage() {
  return (
    <>
      <Terrain position={[0, -0.01, 0]} scale={15} />

      <House scale={20} position={[0, 0, -10]} />
      <ContributionFarm position={[-25, 0, 27]} />
      <Truck position={[-36, 0, -5]} rotation-y={-Math.PI / 9} />
      <TableSet position={[-23, 0, 7]} />
      <Windmill position={[30, 0, 5]} rotation-y={-Math.PI / 2} />
    </>
  );
}
