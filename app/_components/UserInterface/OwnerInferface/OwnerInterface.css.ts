import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'absolute',
  top: 32,
  right: 32,

  display: 'flex',
  gap: 32,
});

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
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: '2px solid rgba(0, 0, 0, 0.3)',
  borderRadius: 16,
  padding: '0 36px 0 44px',
  marginLeft: -28,
  fontSize: 20,
});

export const buttonContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const iconButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 48,
  height: 48,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: '2px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '100%',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
});
