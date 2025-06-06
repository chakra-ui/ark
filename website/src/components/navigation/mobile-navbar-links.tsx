'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { cva } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { navLinks } from '~/lib/nav-links'

const link = cva({
  base: {
    borderBottomWidth: '1px',
    color: 'fg.muted',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'medium',
    gap: '1',
    p: '3',
    transitionDuration: 'normal',
    transitionProperty: 'color',
    transitionTimingFunction: 'default',
    '& svg': {
      width: '4',
      height: '4',
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

export const MobileNavbarLinks = () => {
  const pathname = usePathname()

  return (
    <>
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
    </>
  )
}
