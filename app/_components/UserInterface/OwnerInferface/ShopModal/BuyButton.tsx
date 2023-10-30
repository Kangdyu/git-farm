import { PALETTE } from '@/app/_constants/palette';
import { Button, ButtonProps } from '@mantine/core';
// @ts-ignore
import { useFormStatus } from 'react-dom';

interface BuyButtonProps extends ButtonProps {
  hasItem: boolean;
}

export function BuyButton({ hasItem, children, ...props }: BuyButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={hasItem || pending}
      aria-disabled={pending}
      loading={pending}
      color={PALETTE.wood}
      size="md"
      fullWidth
      {...props}
    >
      {hasItem ? '구매 완료' : children}
    </Button>
  );
}
