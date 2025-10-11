import { create } from 'zustand'
import { UserContext } from '../db/users'

interface UserSessionStore {
  id: string;
  isSignedIn: boolean;
  userContext: UserContext | null;
  roles: string[];
  setSignedIn: (isSignedIn: boolean) => void;
  setUserContext: (userContext: UserContext) => void;
  setRoles: (roles: string[]) => void;
}

export const useUserStore = create<UserSessionStore>((set) => ({
  id: '',
  isSignedIn: false,
  userContext: null,
  roles: [],
  setSignedIn: (isSignedIn: boolean) => set({ isSignedIn }),
  setUserContext: (userContext: UserContext) => set({ userContext }),
  setRoles: (roles: string[]) => set({ roles }),
}))
