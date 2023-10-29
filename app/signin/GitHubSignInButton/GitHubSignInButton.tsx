'use client';

import { Button } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import * as styles from './GitHubSignInButton.css';
import { signIn } from 'next-auth/react';

export function GitHubSignInButton() {
  return (
    <Button
      className={styles.loginButton}
      leftSection={<IconBrandGithub />}
      size="lg"
      onClick={() => signIn('github', { redirect: true, callbackUrl: '/' })}
    >
      Sign In with GitHub
    </Button>
  );
}
