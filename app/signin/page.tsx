import { Modak } from 'next/font/google';
import Image from 'next/image';

import * as styles from './signin.css';
import { GitHubSignInButton } from './GitHubSignInButton';

const modak = Modak({ subsets: ['latin'], weight: '400' });

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <div className={`${modak.className} ${styles.logoContainer}`}>
        <Image src="/images/git-farm-logo.png" width={520} height={410} alt="logo" />
        <p className={styles.title}>
          <span style={{ color: '#333' }}>Git</span> Farm
        </p>
      </div>

      <GitHubSignInButton />
    </main>
  );
}
