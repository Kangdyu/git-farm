import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { GithubProfile } from 'next-auth/providers/github';

interface UserInfo {
  accessToken: string;
  githubLoginId: string;
  githubCreatedAt: string;
}

declare module 'next-auth' {
  interface Session extends DefaultSession, UserInfo {}

  interface Profile extends GithubProfile {}
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, UserInfo {}
}
