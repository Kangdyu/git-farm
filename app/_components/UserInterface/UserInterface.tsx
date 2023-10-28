'use client';

import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import * as styles from './UserInterface.css';
import Image from 'next/image';

export function UserInterface() {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          className={styles.avatar}
          alt="User avatar"
          width={32}
          height={32}
          src={user.avatarUrl ?? '/next.svg'}
        />
        <span>
          {user.name} ({user.email})
        </span>
      </header>
    </div>
  );
}
