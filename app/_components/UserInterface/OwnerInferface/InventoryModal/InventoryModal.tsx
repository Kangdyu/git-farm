'use client';

import { fetcher } from '@/app/_lib/fetcher';
import { InventoryItem } from '@/app/_types/data';
import { Modal, ModalProps, Text } from '@mantine/core';
import useSWR from 'swr';
import * as styles from './InventoryModal.css';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { equipItemAction } from './equipItemAction';
// @ts-ignore
import { useFormState } from 'react-dom';
import { EquipButton } from './EquipButton';
import { MODEL } from '@/app/_constants/models';
import Image from 'next/image';

const initialFormState = {
  message: null,
};

interface InventoryModalProps extends Omit<ModalProps, 'children'> {}

export function InventoryModal(props: InventoryModalProps) {
  const { user } = useUser();

  const [state, formAction] = useFormState(equipItemAction, initialFormState);

  const { data: inventory } = useSWR<InventoryItem[]>('/api/users/inventory', fetcher);

  if (!inventory) return null;

  return (
    <Modal
      title={
        <Text fz={24} fw={700}>
          인벤토리
        </Text>
      }
      closeButtonProps={{
        size: 'lg',
      }}
      centered
      size={'auto'}
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
      <div className={styles.inventoryContainer}>
        {inventory.map((inventoryItem) => {
          const equipped = !!(user.farm!.itemId === inventoryItem.itemId);
          const itemName = inventoryItem.item.name as keyof (typeof MODEL)['crop'];
          const displayName = MODEL.crop[itemName].name;
          const previewImage = MODEL.crop[itemName].previewImageUrl;

          return (
            <form key={inventoryItem.id} className={styles.inventoryItem} action={formAction}>
              <input type="hidden" name="itemId" value={inventoryItem.item.id} />
              <Text fz={18} fw={500}>
                {displayName}
              </Text>
              <Image src={previewImage} alt={displayName} width={128} height={128} />
              <EquipButton equipped={equipped} />
            </form>
          );
        })}
      </div>
      <Text c="red.5">{state?.message}</Text>
    </Modal>
  );
}
