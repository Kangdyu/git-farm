import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import * as styles from './OwnerInterface.css';
import { IconShoppingCart } from '@tabler/icons-react';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { ShopModal } from './ShopModal';

export function OwnerInterface() {
  const { user } = useUser();

  const [opened, { open, close }] = useDisclosure(false);

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

      <button className={styles.shopButton} onClick={open}>
        <IconShoppingCart size={24} />
      </button>

      <ShopModal opened={opened} onClose={close} title="Shop" centered />
    </>
  );
}
