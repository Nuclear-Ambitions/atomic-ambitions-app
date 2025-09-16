import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '../data/sample';

export interface User {
  id: string;
  name?: string; // Full name for display
  profile?: Profile;
  roles: string[];
  permissions: string[];
}

interface AuthState {
  user: User | null;
  isSignedIn: boolean;
  isLoading: boolean;

  // Actions
  signIn: (user: User) => void;
  signOut: () => void;
  setLoading: (loading: boolean) => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isSignedIn: false,
      isLoading: false,

      signIn: (user: User) => {
        set({ user, isSignedIn: true, isLoading: false });
      },

      signOut: () => {
        set({ user: null, isSignedIn: false, isLoading: false });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      hasRole: (role: string) => {
        const { user } = get();
        return user?.roles.includes(role) ?? false;
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        return user?.permissions.includes(permission) ?? false;
      },

      hasAnyRole: (roles: string[]) => {
        const { user } = get();
        return user?.roles.some(role => roles.includes(role)) ?? false;
      },

      hasAnyPermission: (permissions: string[]) => {
        const { user } = get();
        return user?.permissions.some(permission => permissions.includes(permission)) ?? false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isSignedIn: state.isSignedIn
      }),
    }
  )
);
