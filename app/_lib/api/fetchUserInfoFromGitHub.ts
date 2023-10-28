import { graphQLClient } from '@/app/_lib/gql';
import { gql } from 'graphql-request';

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

export async function fetchUserInfoFromGithub({
  githubLoginId,
  createdAt,
  accessToken,
}: {
  githubLoginId: string;
  createdAt: string;
  accessToken: string;
}) {
  const query = gql`
    query getUserContribution($githubLoginId: String!) {
      user(login: $githubLoginId) {
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        ${getYearsBetweenDates(new Date(), new Date(createdAt)).map(
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
    { githubLoginId: githubLoginId },
    { Authorization: `Bearer ${accessToken}` }
  );

  const totalContributions = Object.values(collections).reduce(
    (total, { contributionCalendar: { totalContributions } }) => total + totalContributions,
    0
  );

  const contributionCalendar = yearCollection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays.map(({ contributionCount }) => contributionCount))
    .join(',');

  return {
    avatarUrl,
    followers,
    following,
    totalContributions,
    contributionCalendar,
  };
}
