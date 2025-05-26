'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { cva } from 'styled-system/css'
import { HStack, styled } from 'styled-system/jsx'
import { navLinks } from '~/lib/nav-links'

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

export const NavbarLinks = () => {
  const pathname = usePathname()

  return (
    <HStack gap="6" me="2">
      {navLinks.map((link) => (
        <NavbarLink
          key={link.href}
          href={link.href}
          aria-current={pathname.startsWith(link.hrefPrefix) ? 'page' : undefined}
        >
          {link.label}
          {link.icon && <link.icon />}
        </NavbarLink>
      ))}
    </HStack>
  )
}
