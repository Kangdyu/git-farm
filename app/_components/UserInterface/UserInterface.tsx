'use client';

import * as styles from './UserInterface.css';
import Image from 'next/image';
import { OwnerInterface } from './OwnerInferface';
import { UserDetail } from '@/app/_types/data';
import { HOUSE_LEVELS } from '@/app/_constants/house';

interface UserInterfaceProps {
  user: UserDetail;
  owner?: boolean;
}

export function UserInterface({ user, owner }: UserInterfaceProps) {
  const nextBuildingLevelPoints =
    HOUSE_LEVELS.find(({ level }) => level === user.buildingLevel + 1)?.startContriPoint ?? '-';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Image
            className={styles.avatar}
            alt="User avatar"
            width={60}
            height={60}
            src={user.avatarUrl ?? '/next.svg'}
          />
          <div className={styles.nameContainer}>
            <span className={styles.idText}>{user.githubLoginId}</span>
            <div className={styles.contriPointContainer}>
              <span className={styles.buildingLevelText}>{user.buildingLevel}</span>
              <span>
                {user.contriPoints} / {nextBuildingLevelPoints}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>{owner && <OwnerInterface />}</div>
      </header>
    </div>
  );
}
