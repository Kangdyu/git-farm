import { ButtonHTMLAttributes } from 'react';

import * as styles from './Pin.css';

export function Pin({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.pin} {...props}>
      {children}
    </button>
  );
}
