'use client'
import { useRouter } from 'next/navigation'
import { Button, type ButtonProps } from '~/components/ui/button'

export const SignInButton = (props: ButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(
      `/auth/signin?${new URLSearchParams({
        callbackUrl: window.location.href,
      })}`,
    )
  }
  return <Button {...props} onClick={handleClick} />
}
