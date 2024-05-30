import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Postmark from 'next-auth/providers/postmark'

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: String(token.sub) },
    }),
  },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GitHub,
    Google,
    Postmark({
      from: 'Ark UI <noreply@ark-ui.com>',
    }),
  ],
})

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      name?: string
      email?: string
      image?: string
    }
  }
}
