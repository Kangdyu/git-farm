import { style } from '@vanilla-extract/css';

export const inventoryContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: 16,
});

export const inventoryItem = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '200px',
  height: '300px',
  padding: 24,
  border: '1px solid black',
  borderRadius: 16,
});
