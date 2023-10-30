import { authOptions } from '@/app/_lib/auth';
import prisma from '@/app/_lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const itemsForSale = await prisma.shop.findMany({
      where: {
        isForSale: true,
      },
      include: {
        item: true,
      },
    });

    return NextResponse.json(itemsForSale, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
