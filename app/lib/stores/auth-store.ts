import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '../data/sample';

export interface User {
  id: string;
  email?: string;
  name?: string; // Full name for display
  image?: string;
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
  checkAuthStatus: () => Promise<void>;
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

      checkAuthStatus: async () => {
        const currentState = get();
        if (currentState.isLoading) return; // Prevent multiple simultaneous checks

        set({ isLoading: true });
        try {
          const response = await fetch('/api/auth/status', {
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json() as {
              isSignedIn: boolean;
              user?: {
                id: string;
                email?: string;
                name?: string;
                image?: string;
              };
            };
            if (data.isSignedIn && data.user) {
              set({
                user: {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.name,
                  image: data.user.image,
                  roles: [], // Default roles, can be populated from user data
                  permissions: [], // Default permissions, can be populated from user data
                },
                isSignedIn: true,
                isLoading: false,
              });
            } else {
              set({ user: null, isSignedIn: false, isLoading: false });
            }
          } else {
            set({ user: null, isSignedIn: false, isLoading: false });
          }
        } catch (error) {
          console.error('Failed to check auth status:', error);
          set({ user: null, isSignedIn: false, isLoading: false });
        }
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
