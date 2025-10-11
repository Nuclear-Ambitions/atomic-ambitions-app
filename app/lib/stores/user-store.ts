import { create } from 'zustand'
import { UserContext } from '../db/users'

interface UserAuthStore {
  id: string;
  userContext: UserContext | null;
}

export const useUserStore = create<UserContext>((set) => ({
  id: '',
  userContext: null,
}))
