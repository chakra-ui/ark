'use client'
import { SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { cva } from 'styled-system/css'
import { styled } from 'styled-system/jsx'

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
      <NavbarLink href="/docs/overview/introduction" aria-current={pathname.startsWith('/docs') ? 'page' : undefined}>
        Docs
      </NavbarLink>
      <NavbarLink href="/examples" aria-current={pathname.startsWith('/examples') ? 'page' : undefined}>
        Examples
      </NavbarLink>
      <NavbarLink href="/plus" aria-current={pathname.startsWith('/plus') ? 'page' : undefined}>
        Plus
        <SparklesIcon />
      </NavbarLink>
    </>
  )
}
