import { ReactNode } from 'react';

import * as styles from './Pin.css';

interface PinProps {
  children?: ReactNode;
}

export function Pin({ children }: PinProps) {
  return <button className={styles.pin}>{children}</button>;
}
