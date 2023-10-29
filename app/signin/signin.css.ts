import { PALETTE } from '@/app/_constants/palette';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 80,
  height: '100vh',
  overflow: 'hidden',
});

export const logoContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  position: 'absolute',
  top: 0,
  fontSize: 120,
  color: PALETTE.farmland,
});
