import { Session } from 'next-auth';
import prisma from '@/app/_lib/prisma';
import { getUser } from '@/app/_lib/api/getUser';
import { fetchUserInfoFromGithub } from '@/app/_lib/api/fetchUserInfoFromGitHub';
import { getBuildingLevel } from '@/app/_lib/utils';

export async function updateUserIfOwner({
  session,
  targetUsername,
}: {
  session: Session;
  targetUsername: string;
}) {
  if (session.githubLoginId !== targetUsername) {
    return;
  }

  const { accessToken, githubLoginId, githubCreatedAt } = session;

  const { avatarUrl, followers, following, contributionCalendar, totalContributions } =
    await fetchUserInfoFromGithub({
      githubLoginId: githubLoginId,
      createdAt: githubCreatedAt,
      accessToken,
    });

  const userInDatabase = await getUser(githubLoginId);
  if (!userInDatabase) {
    throw new Error('User not found');
  }

  const newCoins = userInDatabase.coins + (totalContributions - userInDatabase.contriPoints);

  await prisma.user.update({
    where: {
      githubLoginId: githubLoginId,
    },
    data: {
      avatarUrl,
      followers,
      following,
      coins: newCoins,
      contriPoints: totalContributions,
      buildingLevel: getBuildingLevel(totalContributions),
      contributionCalendar,
    },
  });
}
