import { authOptions } from '@/app/_lib/auth';
import prisma from '@/app/_lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const itemsForSale = await prisma.shop.findMany({
      where: {
        isForSale: true,
      },
      include: {
        item: true,
      },
    });

    return Response.json(itemsForSale, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
