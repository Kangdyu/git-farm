'use client';

import { fetcher } from '@/app/_lib/fetcher';
import { ShopItem } from '@/app/_types/data';
import { Modal, ModalProps, Text } from '@mantine/core';
import useSWR from 'swr';
import * as styles from './ShopModal.css';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { buyItemAction } from './buyItemAction';
// @ts-ignore
import { useFormState } from 'react-dom';
import { BuyButton } from './BuyButton';

const initialFormState = {
  message: null,
};

interface ShopModalProps extends Omit<ModalProps, 'children'> {}

export function ShopModal(props: ShopModalProps) {
  const { user } = useUser();

  const [state, formAction] = useFormState(buyItemAction, initialFormState);

  const { data: shopEntities } = useSWR<ShopItem[]>('/api/shop', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!shopEntities) return null;

  return (
    <Modal {...props} size={'auto'}>
      <div className={styles.shopContainer}>
        {shopEntities.map((shopEntity) => {
          const hasItem = !!user.inventory.find(
            ({ item: userItem }) => userItem.id === shopEntity.item.id
          );

          return (
            <form key={shopEntity.id} className={styles.shopItem} action={formAction}>
              <input type="hidden" name="itemId" value={shopEntity.item.id} />
              <input type="hidden" name="itemPrice" value={shopEntity.price} />
              <span>
                {shopEntity.item.name}: ${shopEntity.price}
              </span>
              <BuyButton hasItem={hasItem} />
            </form>
          );
        })}
      </div>
      <Text c="red.5">{state?.message}</Text>
    </Modal>
  );
}
