'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

interface Props {
  redirectTo: string
}

export const EmailSignInForm = (props: Props) => {
  const { redirectTo } = props
  const router = useRouter()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        try {
          // Use signIn with postmark provider to send the email
          const response = await signIn('postmark', {
            email,
            redirect: false,
            callbackUrl: redirectTo,
          })

          if (response?.error) {
            console.error('SignIn error:', response.error)
            router.replace(`/auth/signin?error=${encodeURIComponent(response.error)}`)
          } else {
            // Add email to URL query to show OTP form
            const searchParams = new URLSearchParams(window.location.search)
            searchParams.set('email', email)
            router.replace(`${window.location.pathname}?${searchParams.toString()}`)
          }
        } catch (error) {
          console.error('Authentication error:', error)
          router.replace('/auth/signin?error=Authentication failed')
        }
      }}
    >
      <Stack gap="3">
        <Input autoFocus name="email" type="email" required placeholder="Enter your email" autoComplete="off" />
        <Button type="submit" width="full">
          Continue with Email
        </Button>
      </Stack>
    </form>
  )
}
