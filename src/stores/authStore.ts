// stores/authStore.ts
import { create } from 'zustand';

type User = { id: string; name: string; role: string };
type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (token: string) => {
    const user = decodeToken(token);
    localStorage.setItem('token', token);
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

const decodeToken = (token: string): User => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return {
    id: payload.sub,
    name: payload.name,
    role: payload.role,
  };
};
