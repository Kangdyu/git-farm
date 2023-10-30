'use client';

import { UserDetail } from '@/app/_types/data';
import { UserInfo } from './UserInfo';
import { OwnerInterface } from './OwnerInferface';

interface UserInterfaceProps {
  user: UserDetail;
  owner?: boolean;
}

export function UserInterface({ user, owner }: UserInterfaceProps) {
  return (
    <>
      <UserInfo user={user} />
      {owner && <OwnerInterface />}
    </>
  );
}
