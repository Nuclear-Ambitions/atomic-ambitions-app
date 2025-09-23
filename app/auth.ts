import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Discord from 'next-auth/providers/discord'
import Twitter from 'next-auth/providers/twitter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github, Discord, Twitter],
})
