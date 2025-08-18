'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { stack } from 'styled-system/patterns'
import { Input } from '~/components/ui/input'
import { FormLabel } from '~/components/ui/primitives/form-label'
import { Button } from '~/components/ui/button'

interface Props {
  email: string
  redirectTo: string
}

export function OTPForm(props: Props) {
  const { email, redirectTo } = props
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleOTPVerification(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget)
    const code = formData.get('code') as string

    e.preventDefault()
    setIsSubmitting(true)

    const formattedEmail = encodeURIComponent(email.toLowerCase().trim())
    const formattedCode = encodeURIComponent(code)
    const formattedCallback = encodeURIComponent(redirectTo)
    const otpRequestURL = `/api/auth/callback/postmark?email=${formattedEmail}&token=${formattedCode}&callbackUrl=${formattedCallback}`
    const response = await fetch(otpRequestURL)

    if (response.ok) {
      router.push(redirectTo)
    } else {
      router.replace(`/auth/signin?error=Verification`)
    }

    setIsSubmitting(false)
  }

  return (
    <form
      onSubmit={handleOTPVerification}
      className={stack({
        gap: '5',
        width: 'full',
      })}
    >
      <FormLabel title="Verification code">
        <Input autoFocus required name="code" type="text" placeholder="xxxxxx" />
      </FormLabel>

      <p className={css({ fontSize: 'sm' })}>
        We sent a one time passcode to your email. Enter it above to sign in. Expire after <strong>3 minutes</strong>
      </p>

      <Button type="submit" variant="solid" size="md" disabled={isSubmitting}>
        {isSubmitting ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  )
}
