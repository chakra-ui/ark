import { Link, LinkProps } from '@/components/shared/Link'
import NextLink from 'next/link'

export const PageLink = (props: LinkProps) => {
  const { href, ...rest } = props
  return (
    // @ts-expect-error
    <NextLink legacyBehavior href={href} passHref>
      {/* @ts-expect-error */}
      <Link {...rest} />
    </NextLink>
  )
}
