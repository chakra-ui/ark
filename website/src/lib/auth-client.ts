import { lemonSqueezyClient } from '@chakra-ui/better-auth/client'
import { customSessionClient, emailOTPClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import type { auth } from './auth'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL,
  plugins: [emailOTPClient(), lemonSqueezyClient(), customSessionClient<typeof auth>()],
})

export const { useSession, signIn, signOut, emailOtp, getSession } = authClient
