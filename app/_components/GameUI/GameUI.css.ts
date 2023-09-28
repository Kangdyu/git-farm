import { style } from '@vanilla-extract/css';

export const uiContainerStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

export const uiHeaderStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,

  width: '100%',
  height: 60,
  padding: '0 24px',
  borderBottom: '1px solid #000',
});

export const uiTextStyle = style({
  fontSize: 18,
});

export const uiAvatarStyle = style({
  width: 32,
  height: 32,
  borderRadius: '50%',
});
