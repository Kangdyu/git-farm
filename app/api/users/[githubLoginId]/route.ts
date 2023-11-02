import prisma from '@/app/_lib/prisma';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function GET(_: Request, { params }: { params: { githubLoginId: string } }) {
  const { githubLoginId } = params;

  const user = await prisma.user.findUnique({
    where: {
      githubLoginId,
    },
  });

  if (user) return NextResponse.json({ user });
  else return NextResponse.json({ user: null }, { status: 404 });
}
