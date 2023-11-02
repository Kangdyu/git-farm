import { authOptions } from '@/app/_lib/auth';
import NextAuth from 'next-auth';

export const maxDuration = 30;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
