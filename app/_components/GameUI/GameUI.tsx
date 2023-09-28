import { uiAvatarStyle, uiContainerStyle, uiHeaderStyle } from './GameUI.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export function GameUI() {
  const { data, status } = useSession({ required: true });

  if (status === 'loading') {
    return null;
  }

  return (
    <div className={uiContainerStyle}>
      <header className={uiHeaderStyle}>
        <Image
          className={uiAvatarStyle}
          alt="User avatar"
          width={32}
          height={32}
          src={data.user?.avatarUrl ?? '/next.svg'}
        />
        <span>
          {data.user?.name} ({data?.user?.email})
        </span>
      </header>
    </div>
  );
}
