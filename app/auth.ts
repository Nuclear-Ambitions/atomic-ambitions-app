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
})
