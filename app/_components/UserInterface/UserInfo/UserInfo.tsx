import { Tooltip } from '@mantine/core';
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
          <Tooltip label="건물 레벨" position="bottom">
            <span className={styles.buildingLevelText}>{user.buildingLevel}</span>
          </Tooltip>
          <Tooltip
            label="컨트리 포인트. GitHub 가입 이후부터 현재까지의 총 contribution 횟수 입니다."
            position="bottom"
          >
            <span>
              {user.contriPoints} / {nextBuildingLevelPoints}
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
