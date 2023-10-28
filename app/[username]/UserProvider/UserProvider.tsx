'use client';

import { UserDetail } from '@/app/_lib/api/getUser';
import { createContext, useContext } from 'react';

interface UserContextValue {
  user: UserDetail;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ user, children }: { user: UserDetail; children: React.ReactNode }) {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
