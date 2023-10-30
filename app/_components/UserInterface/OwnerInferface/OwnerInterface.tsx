import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import * as styles from './OwnerInterface.css';
import { IconBackpack, IconShoppingCart } from '@tabler/icons-react';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { ShopModal } from './ShopModal';
import { InventoryModal } from './InventoryModal';
import { mutate } from 'swr';

export function OwnerInterface() {
  const { user } = useUser();

  const [inventoryOpened, { open: openInventory, close: closeInventory }] = useDisclosure(false);
  const [shopOpened, { open: openShop, close: closeShop }] = useDisclosure(false);

  return (
    <div className={styles.container}>
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

      <div className={styles.buttonContainer}>
        <button
          className={styles.iconButton}
          onClick={() => {
            mutate('/api/users/inventory');
            openInventory();
          }}
        >
          <IconBackpack size={24} />
        </button>

        <button className={styles.iconButton} onClick={openShop}>
          <IconShoppingCart size={24} />
        </button>
      </div>

      <InventoryModal opened={inventoryOpened} onClose={closeInventory} title="인벤토리" centered />
      <ShopModal opened={shopOpened} onClose={closeShop} title="상점" centered />
    </div>
  );
}
