import { Button, ButtonProps } from '@/components/shared/Button'
import NextLink from 'next/link'

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
