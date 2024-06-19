'use client'
import { useRouter } from 'next/navigation'
import { Link, type LinkProps } from '~/components/ui'

export const SignInLink = (props: LinkProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(
      `/auth/signin?${new URLSearchParams({
        callbackUrl: window.location.href,
      })}`,
    )
  }
  return (
    <Link asChild {...props}>
      <button type="button" onClick={handleClick}>
        Sign in
      </button>
    </Link>
  )
}
