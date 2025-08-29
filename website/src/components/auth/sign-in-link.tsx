'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { Link, type LinkProps } from '~/components/ui/link'

export const SignInLink = (props: LinkProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const callbackURL = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname
  const href = `/auth/signin?${new URLSearchParams({ callbackURL })}`

  return (
    <Link href={href} {...props}>
      Sign in
    </Link>
  )
}
