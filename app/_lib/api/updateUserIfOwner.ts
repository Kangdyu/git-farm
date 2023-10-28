import { gql } from 'graphql-request';
import { Session } from 'next-auth';
import { graphQLClient } from '../gql';
import prisma from '@/app/_lib/prisma';
import { getUser } from '@/app/_lib/api/getUser';

const BUILDING_LEVELS = [
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
    startContriPoint: 5000,
    level: 5,
  },
];

function getYearsBetweenDates(date1: string | Date, date2: string | Date): number[] {
  const startYear = new Date(date1).getFullYear();
  const endYear = new Date(date2).getFullYear();
  const minYear = Math.min(startYear, endYear);
  const maxYear = Math.max(startYear, endYear);
  const years: number[] = [];

  for (let year = minYear; year <= maxYear; year++) {
    years.push(year);
  }

  return years;
}

interface ContributionResponse {
  user: {
    avatarUrl: string;
    followers: {
      totalCount: number;
    };
    following: {
      totalCount: number;
    };
    [key: `collection${number}`]: {
      contributionCalendar: {
        totalContributions: number;
      };
    };
    yearCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: { contributionDays: { contributionCount: number }[] }[];
      };
    };
  };
}

export async function updateUserIfOwner({
  session,
  targetUsername,
}: {
  session: Session;
  targetUsername: string;
}) {
  if (session.user.nickname !== targetUsername) {
    return;
  }

  const { user, accessToken } = session;

  const query = gql`
    query getUserContribution($nickname: String!) {
      user(login: $nickname) {
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        ${getYearsBetweenDates(new Date(), new Date(user.createdAt)).map(
          (
            year
          ) => `collection${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
            contributionCalendar {
              totalContributions
            }
          }`
        )}
        yearCollection: contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const {
    user: {
      avatarUrl,
      followers: { totalCount: followers },
      following: { totalCount: following },
      yearCollection,
      ...collections
    },
  } = await graphQLClient.request<ContributionResponse>(
    query,
    { nickname: user.nickname },
    { Authorization: `Bearer ${accessToken}` }
  );

  const totalContributions = Object.values(collections).reduce(
    (total, { contributionCalendar: { totalContributions } }) => total + totalContributions,
    0
  );

  const contributionCalendar = yearCollection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays.map(({ contributionCount }) => contributionCount))
    .join(',');

  const userInDatabase = await getUser(user.nickname);

  const newCoins = userInDatabase.coins + (totalContributions - userInDatabase.contriPoints);
  const newBuildingLevel = BUILDING_LEVELS.find(
    ({ startContriPoint }) => startContriPoint < totalContributions
  )!.level;

  await prisma.user.update({
    where: {
      nickname: user.nickname,
    },
    data: {
      avatarUrl,
      followers,
      following,
      coins: newCoins,
      contriPoints: totalContributions,
      buildingLevel: newBuildingLevel,
      contributionCalendar,
    },
  });
}
