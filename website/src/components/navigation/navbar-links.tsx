'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { cva } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'

interface Props {
  framework: string
}

const link = cva({
  base: {
    color: 'fg.muted',
    fontWeight: 'medium',
    textStyle: 'sm',
    transitionDuration: 'normal',
    transitionProperty: 'color',
    transitionTimingFunction: 'default',
    _hover: { color: 'fg.default' },
    _currentPage: {
      color: 'accent.default',
      _hover: {
        color: 'accent.default',
      },
    },
  },
})()

export const NavbarLinks = (props: Props) => {
  const { framework } = props
  const pathname = usePathname()

  return (
    <HStack gap="6" me="2">
      <NextLink
        href={`/${framework}/docs/overview/introduction`}
        className={link}
        aria-current={pathname.startsWith(`/${framework}/docs`) ? 'page' : undefined}
      >
        Docs
      </NextLink>
      <NextLink
        href={`/${framework}/examples`}
        className={link}
        aria-current={pathname.startsWith(`/${framework}/examples`) ? 'page' : undefined}
      >
        Examples
      </NextLink>
      <NextLink
        href={`/${framework}/showcase`}
        className={link}
        aria-current={pathname.startsWith(`/${framework}/showcase`) ? 'page' : undefined}
      >
        Showcase
      </NextLink>
    </HStack>
  )
}
