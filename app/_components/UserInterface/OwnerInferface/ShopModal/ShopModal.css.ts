import { style } from '@vanilla-extract/css';

export const shopContainer = style({
  display: 'flex',
  gap: 16,
});

export const shopItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '200px',
  height: '300px',
  padding: 24,
  border: '1px solid #ccc',
  borderRadius: 16,
});
