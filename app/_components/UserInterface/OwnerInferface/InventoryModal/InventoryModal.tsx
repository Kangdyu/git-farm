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
    <Modal {...props} size={'auto'}>
      <div className={styles.inventoryContainer}>
        {inventory.map((inventoryItem) => {
          const equipped = !!(user.farm!.itemId === inventoryItem.itemId);

          return (
            <form key={inventoryItem.id} className={styles.inventoryItem} action={formAction}>
              <input type="hidden" name="itemId" value={inventoryItem.item.id} />
              <span>{inventoryItem.item.name}</span>
              <EquipButton equipped={equipped} />
            </form>
          );
        })}
      </div>
      <Text c="red.5">{state?.message}</Text>
    </Modal>
  );
}
