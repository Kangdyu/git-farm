import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,

  width: '100%',
  height: 60,
  padding: '0 24px',
});

export const text = style({
  fontSize: 18,
});

export const avatar = style({
  width: 32,
  height: 32,
  borderRadius: '50%',
});
