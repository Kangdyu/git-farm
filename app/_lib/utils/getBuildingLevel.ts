import { HOUSE_LEVELS } from '@/app/_constants/house';

export function getBuildingLevel(contriPoint: number) {
  for (let i = HOUSE_LEVELS.length - 1; i >= 0; i--) {
    if (contriPoint >= HOUSE_LEVELS[i].startContriPoint) {
      return HOUSE_LEVELS[i].level;
    }
  }
  return 0;
}
