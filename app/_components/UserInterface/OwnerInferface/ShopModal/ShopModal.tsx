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

  const { data: shopEntities } = useSWR<ShopItem[]>('/api/shop', fetcher);

  if (!shopEntities) return null;

  return (
    <Modal {...props} size={'auto'}>
      <div className={styles.shopContainer}>
        {shopEntities.map(({ item }) => {
          const hasItem = !!user.inventory.find(({ item: userItem }) => userItem.id === item.id);

          return (
            <form key={item.id} className={styles.shopItem} action={formAction}>
              <input type="hidden" name="itemId" value={item.id} />
              <input type="hidden" name="itemPrice" value={item.price} />
              <span>
                {item.name}: ${item.price}
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
