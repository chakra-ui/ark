import { Link, LinkProps } from '@/components/shared/Link'
import NextLink from 'next/link'

export const PageLink = (props: LinkProps) => {
  const { href = '', ...rest } = props
  return (
    <NextLink legacyBehavior href={href} passHref>
      <Link {...rest} />
    </NextLink>
  )
}
