import { style } from '@vanilla-extract/css';

export const coinContainer = style({
  display: 'flex',
  alignItems: 'center',
});

export const coinImage = style({
  zIndex: 1,
});

export const coinTextContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 100,
  height: 28,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  border: '2px solid rgba(0, 0, 0, 0.3)',
  borderRadius: 4,
  marginLeft: -12,
});

export const shopButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 48,
  height: 48,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  border: '2px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '100%',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
});
