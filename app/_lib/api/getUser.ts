import { Farm, Item, Prisma, User } from '@prisma/client';
import prisma from '../prisma';

export type UserDetail = Prisma.UserGetPayload<{
  include: {
    farm: {
      include: {
        item: true;
      };
    };
  };
}>;

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
