import { authOptions } from '@/app/_lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/signin');

  redirect(`/${session.githubLoginId}`);
}
