'use client';

import { fetcher } from '@/app/_lib/fetcher';
import { ShopItem } from '@/app/_types/data';
import { Modal, ModalProps, Stack, Text } from '@mantine/core';
import useSWR from 'swr';
import * as styles from './ShopModal.css';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { buyItemAction } from './buyItemAction';
// @ts-ignore
import { useFormState } from 'react-dom';
import { BuyButton } from './BuyButton';
import { MODEL } from '@/app/_constants/models';
import Image from 'next/image';

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
    <Modal
      title={
        <Text fz={24} fw={700}>
          상점
        </Text>
      }
      centered
      size={'auto'}
      closeButtonProps={{
        size: 'lg',
      }}
      styles={{
        header: {
          padding: 24,
        },
        body: {
          padding: 24,
          paddingTop: 0,
        },
      }}
      {...props}
    >
      <Stack>
        <div className={styles.shopContainer}>
          {shopEntities.map((shopEntity) => {
            const hasItem = !!user.inventory.find(
              ({ item: userItem }) => userItem.id === shopEntity.item.id
            );
            const itemName = shopEntity.item.name as keyof (typeof MODEL)['crop'];
            const displayName = MODEL.crop[itemName].name;
            const previewImage = MODEL.crop[itemName].previewImageUrl;

            return (
              <form key={shopEntity.id} className={styles.shopItem} action={formAction}>
                <input type="hidden" name="itemId" value={shopEntity.item.id} />
                <input type="hidden" name="itemPrice" value={shopEntity.price} />
                <Text fz={18} fw={500}>
                  {displayName}
                </Text>
                <Image src={previewImage} alt={displayName} width={128} height={128} />
                <BuyButton hasItem={hasItem}>구매 ${shopEntity.price}</BuyButton>
              </form>
            );
          })}
        </div>

        {state?.message && <Text c="red.5">{state?.message}</Text>}
      </Stack>
    </Modal>
  );
}
