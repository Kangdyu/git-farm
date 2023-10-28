'use client';

import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import * as styles from './UserInterface.css';
import Image from 'next/image';
import { BUILDING_LEVELS } from '@/app/_lib/utils';
import { IconShoppingCart } from '@tabler/icons-react';

export function UserInterface() {
  const { user } = useUser();

  const nextBuildingLevelPoints =
    BUILDING_LEVELS.find(({ level }) => level === user.buildingLevel + 1)?.startContriPoint ?? '-';

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

        <div className={styles.headerRight}>
          <div className={styles.coinContainer}>
            <Image
              className={styles.coinImage}
              width={48}
              height={48}
              src="/images/coin.png"
              alt="coin"
            />
            <div className={styles.coinTextContainer}>{user.coins}</div>
          </div>

          <button className={styles.shopButton}>
            <IconShoppingCart size={24} />
          </button>
        </div>
      </header>
    </div>
  );
}
