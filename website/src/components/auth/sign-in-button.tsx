'use client'
import { useRouter } from 'next/navigation'
import { Button, type ButtonProps } from '~/components/ui'

export const SignInButton = (props: ButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(
      `/auth/signin?${new URLSearchParams({
        callbackUrl: window.location.href,
      })}`,
    )
  }
  return (
    <Button variant="outline" size="lg" onClick={handleClick} {...props}>
      Sign in
    </Button>
  )
}
