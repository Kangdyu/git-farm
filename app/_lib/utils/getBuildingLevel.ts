export const BUILDING_LEVELS = [
  {
    startContriPoint: -1,
    level: 1,
  },
  {
    startContriPoint: 100,
    level: 2,
  },
  {
    startContriPoint: 500,
    level: 3,
  },
  {
    startContriPoint: 1000,
    level: 4,
  },
  {
    startContriPoint: 5000,
    level: 5,
  },
];

export function getBuildingLevel(contributionPoints: number) {
  return BUILDING_LEVELS.find(({ startContriPoint }) => startContriPoint < contributionPoints)!
    .level;
}
