import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

interface GitHubUser {
  id: string;
  name?: string | null;
  nickname: string;
  email?: string | null;
  avatarUrl?: string | null;
  followers: number;
  following: number;
  createdAt: string;
}

declare module 'next-auth' {
  interface User extends GitHubUser {}

  interface Session extends DefaultSession {
    accessToken: string;
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface User extends GitHubUser {}

  interface JWT extends DefaultJWT {
    accessToken: string;
    user: User;
  }
}
