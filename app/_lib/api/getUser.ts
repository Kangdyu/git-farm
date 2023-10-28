import prisma from '../prisma';

export async function getUser(githubLoginId: string) {
  const user = await prisma.user.findUnique({
    where: {
      githubLoginId,
    },
    include: {
      farm: true,
    },
  });

  return user;
}
