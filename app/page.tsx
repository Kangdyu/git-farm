'use client';

import { GameCanvas } from '@/app/_components/GameCanvas';
import { UserInterface } from '@/app/_components/UserInterface';
import { homeContainerStyle } from '@/app/home.css';
import { useSession } from 'next-auth/react';

export default function Home() {
  useSession({ required: true });

  return (
    <div className={homeContainerStyle}>
      <GameCanvas />
      <UserInterface />
    </div>
  );
}
