import { style } from '@vanilla-extract/css';

export const ranking = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: '100%',
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const rankingItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '12px 24px',
  border: `1px solid #ccc`,
  borderRadius: 4,
});
