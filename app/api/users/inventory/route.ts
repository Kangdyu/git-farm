import { getUser } from '@/app/_lib/api/getUser';
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

    const user = await getUser(session.githubLoginId);
    if (!user) {
      return NextResponse.json({ message: 'Cannot find user' }, { status: 404 });
    }

    const inventory = await prisma.inventory.findMany({
      where: {
        userId: user.id,
      },
      include: {
        item: true,
      },
    });

    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
