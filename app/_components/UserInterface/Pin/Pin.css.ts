import { PALETTE } from '@/app/_constants/palette';
import { globalStyle, style } from '@vanilla-extract/css';

export const pin = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: PALETTE.blue,
  border: `4px solid white`,
  transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',

  selectors: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'white',
      border: `4px solid ${PALETTE.blue}`,
    },
  },
});

globalStyle(`${pin}:hover svg`, {
  stroke: PALETTE.blue,
  transition: 'stroke 0.3s ease-in-out',
});
