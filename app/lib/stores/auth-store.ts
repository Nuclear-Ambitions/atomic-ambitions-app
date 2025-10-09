import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Profile } from '../data/sample'

export interface Membership {
  level: string;
  status: string;
  joinedAt?: Date | string | null;
}

export interface User {
  id: string;
  email?: string;
  name?: string; // Full name for display
  alias?: string;
  image?: string;
  profile?: Profile;
  membership?: Membership;
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
        set({ user, isSignedIn: true, isLoading: false })
      },

      signOut: () => {
        set({ user: null, isSignedIn: false, isLoading: false })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      checkAuthStatus: async () => {
        const currentState = get()
        if (currentState.isLoading) {
          console.log('🔐 [AUTH STORE] Already checking auth status, skipping...')
          return // Prevent multiple simultaneous checks
        }

        console.log('🔐 [AUTH STORE] Checking auth status...')
        set({ isLoading: true })
        try {
          const response = await fetch('/api/auth/user-context', {
            credentials: 'include',
          })

          console.log('🔐 [AUTH STORE] Response status:', response.status)

          if (response.ok) {
            const data = await response.json() as {
              isSignedIn: boolean;
              user?: {
                id: string;
                email?: string;
                name?: string;
                alias?: string;
                image?: string;
                membership?: Membership;
              };
            }

            console.log('🔐 [AUTH STORE] Response data:', {
              isSignedIn: data.isSignedIn,
              hasUser: !!data.user,
              userId: data.user?.id,
              userName: data.user?.name,
              userAlias: data.user?.alias,
              membershipLevel: data.user?.membership?.level,
              membershipStatus: data.user?.membership?.status,
            })

            if (data.isSignedIn && data.user) {
              const userData = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                alias: data.user.alias,
                image: data.user.image,
                membership: data.user.membership,
                roles: [], // Default roles, can be populated from user data
                permissions: [], // Default permissions, can be populated from user data
              }

              console.log('🔐 [AUTH STORE] Setting user data in store:', userData)

              set({
                user: userData,
                isSignedIn: true,
                isLoading: false,
              })
            } else {
              console.log('🔐 [AUTH STORE] No user in response, clearing store')
              set({ user: null, isSignedIn: false, isLoading: false })
            }
          } else {
            console.log('🔐 [AUTH STORE] Response not OK, clearing store')
            set({ user: null, isSignedIn: false, isLoading: false })
          }
        } catch (error) {
          console.error('🔐 [AUTH STORE] Failed to check auth status:', error)
          set({ user: null, isSignedIn: false, isLoading: false })
        }
      },

      hasRole: (role: string) => {
        const { user } = get()
        return user?.roles.includes(role) ?? false
      },

      hasPermission: (permission: string) => {
        const { user } = get()
        return user?.permissions.includes(permission) ?? false
      },

      hasAnyRole: (roles: string[]) => {
        const { user } = get()
        return user?.roles.some(role => roles.includes(role)) ?? false
      },

      hasAnyPermission: (permissions: string[]) => {
        const { user } = get()
        return user?.permissions.some(permission => permissions.includes(permission)) ?? false
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
)
