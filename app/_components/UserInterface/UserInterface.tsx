import * as styles from './UserInterface.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export function UserInterface() {
  const { data, status } = useSession({ required: true });

  if (status === 'loading') {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          className={styles.avatar}
          alt="User avatar"
          width={32}
          height={32}
          src={data.user?.avatarUrl ?? '/next.svg'}
        />
        <span>
          {data.user?.name} ({data?.user?.email})
        </span>
      </header>
    </div>
  );
}
