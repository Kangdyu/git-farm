import GithubProvider from 'next-auth/providers/github';
import prisma from './prisma';
import { NextAuthOptions } from 'next-auth';
import { getUser } from '@/app/_lib/api/getUser';
import { fetchUserInfoFromGithub } from '@/app/_lib/api/fetchUserInfoFromGitHub';
import { getBuildingLevel } from '@/app/_lib/utils';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account, user, profile }) {
      if (!account || !user || !profile) {
        return false;
      }
      const userInDatabase = await getUser(profile.login);
      // First Login
      if (!userInDatabase) {
        const { contributionCalendar, totalContributions } = await fetchUserInfoFromGithub({
          githubLoginId: profile.login,
          createdAt: profile.created_at,
          accessToken: account.access_token!,
        });

        await prisma.user.create({
          data: {
            githubId: profile.id,
            name: profile.name ?? profile.login,
            githubLoginId: profile.login,
            email: profile.email ?? null,
            avatarUrl: profile.avatar_url,
            followers: profile.followers,
            following: profile.following,
            coins: 0,
            contriPoints: totalContributions,
            buildingLevel: getBuildingLevel(totalContributions),
            contributionCalendar,
            githubCreatedAt: profile.created_at,
          },
        });

        await prisma.farm.create({
          data: {
            user: {
              connect: {
                githubLoginId: profile.login,
              },
            },
            item: {
              connect: {
                name: 'grass',
              },
            },
          },
        });
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account && user && profile) {
        token.accessToken = account.access_token!;
        token.githubLoginId = profile.login;
        token.githubCreatedAt = profile.created_at;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.githubLoginId = token.githubLoginId;
      session.githubCreatedAt = token.githubCreatedAt;

      return session;
    },
  },
};
