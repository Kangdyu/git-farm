import { Button, ButtonProps } from '@mantine/core';
// @ts-ignore
import { useFormStatus } from 'react-dom';

interface EquipButtonProps extends ButtonProps {
  equipped: boolean;
}

export function EquipButton({ equipped, ...props }: EquipButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={equipped || pending}
      aria-disabled={pending}
      loading={pending}
      {...props}
    >
      {equipped ? '사용 중' : '사용'}
    </Button>
  );
}
