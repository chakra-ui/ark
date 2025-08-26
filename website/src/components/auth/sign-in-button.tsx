'use client'
import NextLink from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button, type ButtonProps } from '~/components/ui/button'

export const SignInButton = (props: ButtonProps) => {
  const { children, ...buttonProps } = props
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const callbackURL = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname

  return (
    <Button asChild {...buttonProps}>
      <NextLink href={{ pathname: '/auth/signin', query: { callbackURL } }}>{children || 'Sign In'}</NextLink>
    </Button>
  )
}
