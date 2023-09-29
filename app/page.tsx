'use client';

import { GameCanvas } from '@/app/_components/GameCanvas';
import { GameUI } from '@/app/_components/GameUI';
import { homeContainerStyle } from '@/app/home.css';
import { useSession } from 'next-auth/react';

export default function Home() {
  useSession({ required: true });

  return (
    <div className={homeContainerStyle}>
      <GameCanvas />
      <GameUI />
    </div>
  );
}
