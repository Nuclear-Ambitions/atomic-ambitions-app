import { DefaultSession } from 'next-auth' // Or 'next-auth'
import { UserContext } from '@/lib/data/users'

declare module 'next-auth' {
  // Or 'next-auth'
  interface Session {
    user?: {
      id?: string
      summary?: UserContext
    } & DefaultSession['user']
  }
}
