'use client'
import { useState, type FormEvent } from 'react'
import { Stack } from 'styled-system/jsx'
import { toaster } from '~/components/toaster'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { emailOtp } from '~/lib/auth-client'
import { VerfiyOtpDialog } from './verify-otp-dialog'

interface Props {
  callbackURL: string
}

export const EmailSignInForm = (props: Props) => {
  const { callbackURL } = props
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    await emailOtp
      .sendVerificationOtp({
        email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            setOpen(true)
          },
          onError: () => {
            toaster.create({
              title: 'An error occurred while sending the OTP. Please try again later.',
              type: 'error',
            })
          },
        },
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack gap="3">
          <Input
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" width="full" loading={loading}>
            Continue with Email
          </Button>
        </Stack>
      </form>
      <VerfiyOtpDialog
        onSuccess={() => {
          window.location.href = callbackURL
        }}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        email={email}
      />
    </>
  )
}
