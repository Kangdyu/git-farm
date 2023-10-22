import { Clone, Plane, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { PALETTE } from '@/app/_constants/palette';
import { ContributionCalendar, ContributionCalendarDay } from '@/app/_types/github-graphql';

export function ContributionFarm(props: GroupProps) {
  const [contributions, setContributions] = useState<ContributionCalendarDay[]>([]);

  const crop = useGLTF('/models/crops/carrot.gltf');

  useEffect(() => {
    const fetchContributions = async () => {
      const { data } = await axios.get<ContributionCalendar>('/api/v1/contributions');
      const weeks = data.weeks;

      const days = weeks.flatMap((week) => week.contributionDays);

      setContributions(days);
    };

    fetchContributions();
  }, []);

  return (
    <group {...props}>
      <Plane args={[50, 8]} rotation={[-Math.PI / 2, 0, 0]} position={[24, 0.01, 3]} receiveShadow>
        <meshStandardMaterial color={PALETTE.farmland} />
      </Plane>
      {contributions.map((day, index) => {
        return day.contributionCount === 0 ? null : (
          <Clone
            key={index}
            object={crop.scene}
            position={[Math.floor(index / 7), -1, index % 7]}
            castShadow
            scale={4}
          />
        );
      })}
    </group>
  );
}
