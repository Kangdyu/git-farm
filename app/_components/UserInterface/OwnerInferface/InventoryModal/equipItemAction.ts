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
});

export async function equipItemAction(_: any, formData: FormData) {
  const { itemId } = schema.parse({
    itemId: formData.get('itemId'),
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

  if (user.farm!.itemId === itemId) {
    return { message: '이미 사용 중인 아이템입니다.' };
  }

  try {
    await prisma.farm.update({
      where: {
        userId: user.id,
      },
      data: {
        item: {
          connect: {
            id: itemId,
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
