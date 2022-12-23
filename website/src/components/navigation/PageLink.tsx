import NextLink from 'next/link'
import { Link, LinkProps } from '../shared/Link'

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
