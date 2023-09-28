import { ContributionCalendar, ContributionCalendarDay } from '@/app/_types/github-graphql';
import { Box } from '@react-three/drei';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HEIGHT_SCALE = 0.1;

export function ContributionGraph() {
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
    <>
      {contributions.map((day, index) => (
        <Box
          key={index}
          position={[Math.floor(index / 7), (day.contributionCount / 2) * HEIGHT_SCALE, index % 7]}
          args={[1, day.contributionCount * HEIGHT_SCALE, 1]}
        >
          <meshStandardMaterial color={day.contributionCount === 0 ? '#8e7161' : day.color} />
        </Box>
      ))}
    </>
  );
}
