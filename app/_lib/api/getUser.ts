import prisma from '../prisma';

export async function getUser(githubLoginId: string) {
  const user = await prisma.user.findUnique({
    where: {
      githubLoginId,
    },
    include: {
      farm: {
        include: {
          item: true,
        },
      },
    },
  });

  return user;
}
