import PostgresAdapter from '@auth/pg-adapter'
import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Discord from 'next-auth/providers/discord'
import Twitter from 'next-auth/providers/twitter'
import { sendVerificationRequest } from '@/lib/authSendRequest'
import { pool } from '@/lib/db/Database'
import { UserDataAccess } from './lib/db/users'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Resend({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest
    }),
    Google,
    Github,
    Discord,
    Twitter,
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async session({ session, user }) {
      if (user.id) {
        session.user.id = user.id

        const userContext = await UserDataAccess.getUserContext(user.id)
        if (userContext) {
          session.user.summary = userContext
        }
      }
      return session
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
    },
    async signOut(message) {
    }
  },
})
