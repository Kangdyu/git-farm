export const BUILDING_LEVELS = [
  {
    startContriPoint: 0,
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
    startContriPoint: 2000,
    level: 5,
  },
];

export function getBuildingLevel(contriPoint: number) {
  for (let i = BUILDING_LEVELS.length - 1; i >= 0; i--) {
    if (contriPoint >= BUILDING_LEVELS[i].startContriPoint) {
      return BUILDING_LEVELS[i].level;
    }
  }
  return 0;
}
