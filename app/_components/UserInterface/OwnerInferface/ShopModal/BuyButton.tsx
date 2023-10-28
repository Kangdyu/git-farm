import { Button, ButtonProps } from '@mantine/core';
// @ts-ignore
import { useFormStatus } from 'react-dom';

interface BuyButtonProps extends ButtonProps {
  hasItem: boolean;
}

export function BuyButton({ hasItem, ...props }: BuyButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={hasItem || pending}
      aria-disabled={pending}
      loading={pending}
      {...props}
    >
      {hasItem ? '구매 완료' : '구매'}
    </Button>
  );
}
