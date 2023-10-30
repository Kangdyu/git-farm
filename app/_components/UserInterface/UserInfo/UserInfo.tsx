import Image from 'next/image';
import * as styles from './UserInfo.css';
import { HOUSE_LEVELS } from '@/app/_constants/house';
import { UserDetail } from '@/app/_types/data';

interface UserInfoProps {
  user: UserDetail;
}

export function UserInfo({ user }: UserInfoProps) {
  const nextBuildingLevelPoints =
    HOUSE_LEVELS.find(({ level }) => level === user.buildingLevel + 1)?.startContriPoint ?? '-';

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        alt="User avatar"
        width={80}
        height={80}
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
  );
}
