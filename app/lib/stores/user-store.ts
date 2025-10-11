import { create } from 'zustand'
import { UserContext } from '../db/users'

interface UserSessionStore {
  id: string;
  userContext: UserContext | null;
  roles: string[];
  isMember: () => boolean;
  setUserContext: (userContext: UserContext) => void;
  setRoles: (roles: string[]) => void;
}

export const useUserStore = create<UserSessionStore>((set) => ({
  id: '',
  userContext: null,
  roles: [],
  isMember: () => (state.userContext?.membership?.level === 'member'),
  setUserContext: (userContext: UserContext) => set({ userContext }),
  setRoles: (roles: string[]) => set({ roles }),
}))
