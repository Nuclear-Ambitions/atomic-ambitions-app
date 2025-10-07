import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from 'pg'
import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import Google from 'next-auth/providers/google'
// import Github from 'next-auth/providers/github'
// import Discord from 'next-auth/providers/discord'
// import Twitter from 'next-auth/providers/twitter'
import { sendVerificationRequest } from '@/lib/authSendRequest'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Resend({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // apiKey: process.env.AUTH_RESEND_KEY,
      sendVerificationRequest
    }),
    Google,
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('🔐 [AUTH DEBUG] signIn callback triggered')
      console.log('🔐 [AUTH DEBUG] signIn params:', {
        user: user ? { id: user.id, email: user.email, name: user.name } : null,
        account: account ? { provider: account.provider, type: account.type } : null,
        profile: profile ? { email: profile.email, name: profile.name } : null,
        email,
        credentials: credentials ? Object.keys(credentials) : null
      })
      return true
    },
    async session({ session, token, user }) {
      console.log('🔐 [AUTH DEBUG] session callback triggered')
      console.log('🔐 [AUTH DEBUG] session params:', {
        session: session ? { user: session.user ? { email: session.user.email, name: session.user.name } : null } : null,
        token: token ? { email: token.email, name: token.name, sub: token.sub } : null,
        user: user ? { id: user.id, email: user.email, name: user.name } : null
      })
      return session
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      console.log('🔐 [AUTH DEBUG] jwt callback triggered')
      console.log('🔐 [AUTH DEBUG] jwt params:', {
        token: token ? { email: token.email, name: token.name, sub: token.sub } : null,
        user: user ? { id: user.id, email: user.email, name: user.name } : null,
        account: account ? { provider: account.provider, type: account.type } : null,
        profile: profile ? { email: profile.email, name: profile.name } : null,
        trigger,
        session: session ? { user: session.user ? { email: session.user.email, name: session.user.name } : null } : null
      })
      return token
    }
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log('🔐 [AUTH DEBUG] signIn event triggered')
      console.log('🔐 [AUTH DEBUG] signIn event params:', {
        user: user ? { id: user.id, email: user.email, name: user.name } : null,
        account: account ? { provider: account.provider, type: account.type } : null,
        profile: profile ? { email: profile.email, name: profile.name } : null,
        isNewUser
      })
    },
    async signOut(message) {
      console.log('🔐 [AUTH DEBUG] signOut event triggered')
      console.log('🔐 [AUTH DEBUG] signOut event params:', message)
    }
  },
  debug: process.env.NODE_ENV === 'development' || process.env.NEXTAUTH_DEBUG === 'true',
})
