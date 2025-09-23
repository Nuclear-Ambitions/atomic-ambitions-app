import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from 'pg'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
// import Github from 'next-auth/providers/github'
// import Discord from 'next-auth/providers/discord'
// import Twitter from 'next-auth/providers/twitter'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [Google],
})
