import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  fontSize: 16,
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 16,

  width: '100%',
  padding: '24px 24px 0',

  userSelect: 'none',
});

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
});
