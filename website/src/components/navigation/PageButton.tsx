import { Link, LinkProps } from '@/components/shared/Link'
import type { ButtonVariants } from '@/panda/recipes'
import NextLink from 'next/link'

export type PageButtonProps = LinkProps & { href: string } & ButtonVariants

export const PageButton = (props: any) => {
  const { href, ...rest } = props
  return (
    <NextLink legacyBehavior href={href} passHref>
      <Link href={href} {...rest} />
    </NextLink>
  )
}
