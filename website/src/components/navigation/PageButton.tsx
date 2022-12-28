import NextLink from 'next/link'
import { Button, ButtonProps } from '../shared/Button'

export type PageButtonProps = ButtonProps & { href: string }

export const PageButton = (props: PageButtonProps) => {
  const { href, ...rest } = props
  return (
    <NextLink legacyBehavior href={href} passHref>
      {/* @ts-expect-error */}
      <Button as="a" href={href} {...rest} />
    </NextLink>
  )
}
