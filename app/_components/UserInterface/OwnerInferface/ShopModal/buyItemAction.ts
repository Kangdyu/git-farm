'use server';

import { getUser } from '@/app/_lib/api/getUser';
import { authOptions } from '@/app/_lib/auth';
import prisma from '@/app/_lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  itemId: z.string(),
  itemPrice: z.number(),
});

export async function buyItemAction(_: any, formData: FormData) {
  const { itemId, itemPrice } = schema.parse({
    itemId: formData.get('itemId'),
    itemPrice: Number(formData.get('itemPrice')),
  });

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/api/auth/signin');
  }

  const { githubLoginId } = session;
  const user = await getUser(githubLoginId);
  if (!user) {
    return redirect('/api/auth/signin');
  }

  if (user.coins < itemPrice) {
    return { message: '코인이 부족합니다.' };
  }

  try {
    await prisma.user.update({
      where: {
        githubLoginId,
      },
      data: {
        coins: user.coins - itemPrice,
      },
    });
    await prisma.inventory.create({
      data: {
        quantity: 1,
        item: {
          connect: {
            id: itemId,
          },
        },
        user: {
          connect: {
            githubLoginId,
          },
        },
      },
    });
    return revalidatePath('/[username]', 'page');
  } catch (error) {
    console.error(error);
    return { message: '에러가 발생했습니다.' };
  }
}
