import { PALETTE } from '@/app/_constants/palette';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body, main', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  backgroundColor: PALETTE.sky,
});
