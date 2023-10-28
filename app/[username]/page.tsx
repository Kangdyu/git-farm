import { UserProvider } from './UserProvider';
import { GameCanvas } from '@/app/_components/GameCanvas';
import { UserInterface } from '@/app/_components/UserInterface';
import { getUser } from '@/app/_lib/api/getUser';
import { updateUserIfOwner } from '@/app/_lib/api/updateUserIfOwner';
import { authOptions } from '@/app/_lib/auth';
import { homeContainerStyle } from '@/app/home.css';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  await updateUserIfOwner({ session, targetUsername: username });
  const user = await getUser(username);
  if (!user) notFound();

  return (
    <div className={homeContainerStyle}>
      <UserProvider user={user}>
        <GameCanvas />
        {session.githubLoginId === username && <UserInterface />}
      </UserProvider>
    </div>
  );
}
