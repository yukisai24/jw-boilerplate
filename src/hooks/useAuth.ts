// 📁 src/hooks/useAuth.ts (Zustand 기반)
import { create } from 'zustand';
import { ICurrentUser } from '@/types/user';

interface AuthState {
  authenticated: boolean;
  login: () => void;
  logout: () => void;
  currentUser: ICurrentUser | null;
}

export const useAuth = create<AuthState>((set) => ({
  authenticated: !!localStorage.getItem('token'),
  login: () => {
    localStorage.setItem('token', 'fake-token');
    set({ authenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ authenticated: false });
  },
  currentUser
}));
