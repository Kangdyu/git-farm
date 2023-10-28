import Image from 'next/image';
import * as styles from './OwnerInterface.css';
import { IconShoppingCart } from '@tabler/icons-react';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';

export function OwnerInterface() {
  const { user } = useUser();

  return (
    <>
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
    </>
  );
}
