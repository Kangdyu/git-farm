import { fetcher } from '@/app/_lib/fetcher';
import { ShopItem } from '@/app/_types/data';
import { Button, Modal, ModalProps } from '@mantine/core';
import useSWR from 'swr';
import * as styles from './ShopModal.css';

interface ShopModalProps extends Omit<ModalProps, 'children'> {}

export function ShopModal(props: ShopModalProps) {
  const { data: shopEntities } = useSWR<ShopItem[]>('/api/shop', fetcher);

  if (!shopEntities) return null;

  return (
    <Modal {...props} size={'auto'}>
      <div className={styles.shopContainer}>
        {shopEntities.map(({ item }) => (
          <div key={item.id} className={styles.shopItem}>
            <span>
              {item.name}: ${item.price}
            </span>
            <Button>Buy</Button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
