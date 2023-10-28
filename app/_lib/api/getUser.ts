import prisma from '../prisma';

export async function getUser(nickname: string) {
  const user = await prisma.user.findUnique({
    where: {
      nickname,
    },
    include: {
      farm: true,
    },
  });

  if (!user) throw new Error('User not found');

  return user;
}
