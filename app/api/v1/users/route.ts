import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { ContributionsCollection } from '@/app/_types/github-graphql';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: 'Not Authenticated' }, { status: 401 });
  }

  const { nickname } = token.user;
  const query = `
    query {
      user(login: "${nickname}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                color
                date
              }
            }
          }
        }
      }
    }
  `;

  const { accessToken } = token;

  const { data } = await axios.post<{
    data: { user: { contributionsCollection: ContributionsCollection } };
  }>('https://api.github.com/graphql', JSON.stringify({ query }), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const contributions = data.data.user.contributionsCollection.contributionCalendar;

  return NextResponse.json(contributions, { status: 200 });
}
