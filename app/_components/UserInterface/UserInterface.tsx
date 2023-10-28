import * as styles from './UserInterface.css';
import Image from 'next/image';
import { User } from '@prisma/client';

interface UserInterfaceProps {
  user: User;
}

export async function UserInterface({ user }: UserInterfaceProps) {
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
