// 📁 src/hooks/useAuth.ts (Zustand 기반)
import { create } from 'zustand';

import { ICurrentUser } from '@/types/user';

interface AuthState {
  authenticated: boolean;
  currentUser: ICurrentUser | null;
  shouldChangePassword: boolean;
  login: (user: ICurrentUser) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  authenticated: !!localStorage.getItem('token'),
  currentUser: JSON.parse(localStorage.getItem('user') || 'null'),
  shouldChangePassword:
    JSON.parse(localStorage.getItem('user') || 'null')?.shouldChangePassword ||
    false,
  login: (user) => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify(user));
    set({
      authenticated: true,
      currentUser: user,
      shouldChangePassword: user.shouldChangePassword,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      authenticated: false,
      currentUser: null,
      shouldChangePassword: false,
    });
  },
}));
