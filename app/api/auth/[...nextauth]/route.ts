import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, User } from '@prisma/client';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          githubId: profile.id,
          name: profile.name ?? profile.login,
          nickname: profile.login,
          email: profile.email,
          avatarUrl: profile.avatar_url,
          followers: profile.followers,
          following: profile.following,
          createdAt: profile.created_at,
          githubCreatedAt: profile.created_at,
          coins: 0,
          contriPoints: 0,
          buildingLevel: 1,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token!;
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
