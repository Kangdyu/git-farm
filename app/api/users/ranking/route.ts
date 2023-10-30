import prisma from '@/app/_lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const take = req.nextUrl.searchParams.get('top') || 10;

  const users = await prisma.user.findMany({
    orderBy: {
      contriPoints: 'desc',
    },
    take: Number(take),
  });

  return NextResponse.json({ users });
}
