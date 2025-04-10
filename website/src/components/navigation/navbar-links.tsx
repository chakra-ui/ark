'use client'
import { SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { cva } from 'styled-system/css'
import { HStack, styled } from 'styled-system/jsx'

interface Props {
  framework: string
}

const link = cva({
  base: {
    color: 'fg.muted',
    fontWeight: 'medium',
    display: 'flex',
    alignItems: 'center',
    gap: '1',
    textStyle: 'sm',
    transitionDuration: 'normal',
    transitionProperty: 'color',
    transitionTimingFunction: 'default',
    whiteSpace: 'nowrap',
    '& svg': {
      width: '3.5',
      height: '3.5',
      color: 'colorPalette.default',
    },
    _hover: { color: 'fg.default' },
    _currentPage: {
      color: 'colorPalette.default',
      _hover: {
        color: 'colorPalette.default',
      },
    },
  },
})

const NavbarLink = styled(NextLink, link)

export const NavbarLinks = (props: Props) => {
  const { framework } = props
  const pathname = usePathname()

  return (
    <HStack gap="6" me="2">
      <NavbarLink
        href={`/${framework}/docs/overview/introduction`}
        aria-current={pathname.startsWith(`/${framework}/docs`) ? 'page' : undefined}
      >
        Docs
      </NavbarLink>
      <NavbarLink
        href={`/${framework}/examples`}
        aria-current={pathname.startsWith(`/${framework}/examples`) ? 'page' : undefined}
      >
        Examples
      </NavbarLink>
      <NavbarLink
        href={`/${framework}/plus`}
        aria-current={pathname.startsWith(`/${framework}/plus`) ? 'page' : undefined}
      >
        Ark Plus
        <SparklesIcon />
      </NavbarLink>
    </HStack>
  )
}
