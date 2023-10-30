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

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const nameContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const idText = style({
  fontSize: 20,
  fontWeight: 600,
});

export const contriPointContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const buildingLevelText = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  fontWeight: 600,
  width: 24,
  height: 24,
  borderRadius: '100%',
  border: '2px solid rgba(0, 0, 0, 0.3)',
});

export const avatar = style({
  borderRadius: '50%',
});

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
});
