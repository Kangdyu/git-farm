import { fetcher } from '@/app/_lib/fetcher';
import { ShopItem } from '@/app/_types/data';
import { Button, Modal, ModalProps } from '@mantine/core';
import useSWR from 'swr';
import * as styles from './ShopModal.css';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';

interface ShopModalProps extends Omit<ModalProps, 'children'> {}

export function ShopModal(props: ShopModalProps) {
  const { data: shopEntities } = useSWR<ShopItem[]>('/api/shop', fetcher);
  const { user } = useUser();

  if (!shopEntities) return null;

  return (
    <Modal {...props} size={'auto'}>
      <div className={styles.shopContainer}>
        {shopEntities.map(({ item }) => {
          const hasItem = !!user.inventory.find(({ item: userItem }) => userItem.id === item.id);

          return (
            <div key={item.id} className={styles.shopItem}>
              <span>
                {item.name}: ${item.price}
              </span>
              <Button disabled={hasItem}>{hasItem ? '구매 완료' : '구매'}</Button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
