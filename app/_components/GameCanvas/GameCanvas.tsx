'use client';

import { ContributionCalendar, ContributionCalendarDay } from '@/app/_types/github-graphql';
import { Box, Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HEIGHT_SCALE = 0.1;

export function GameCanvas() {
  const [contributions, setContributions] = useState<ContributionCalendarDay[]>([]);

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
    <Canvas>
      <OrbitControls makeDefault />

      <directionalLight color="white" intensity={1} position={[1, 2, 3]} />
      <ambientLight color="white" intensity={0.5} />

      <Center scale={0.1}>
        {contributions.map((day, index) => (
          <Box
            key={index}
            position={[
              Math.floor(index / 7),
              (day.contributionCount / 2) * HEIGHT_SCALE,
              index % 7,
            ]}
            args={[1, day.contributionCount * HEIGHT_SCALE, 1]}
          />
        ))}
      </Center>
    </Canvas>
  );
}
