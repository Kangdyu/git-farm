import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'absolute',
  top: 32,
  left: 32,

  display: 'flex',
  alignItems: 'center',
  gap: 32,

  backgroundColor: 'rgba(255,255,255,0.5)',
  border: '2px solid rgba(0,0,0,0.3)',
  padding: '18px 24px',
  borderRadius: 16,
});

export const avatar = style({
  border: `1px solid #ccc`,
  borderRadius: '50%',
});

export const nameContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const idText = style({
  fontSize: 24,
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
