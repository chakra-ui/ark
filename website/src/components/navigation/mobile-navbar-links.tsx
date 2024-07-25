'use client'
import { SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { cva } from 'styled-system/css'
import { styled } from 'styled-system/jsx'

interface Props {
  framework: string
}

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
      color: 'accent.default',
    },
    _hover: { color: 'fg.default' },
    _currentPage: {
      color: 'accent.default',
      _hover: {
        color: 'accent.default',
      },
    },
  },
})

const NavbarLink = styled(NextLink, link)

export const MobileNavbarLinks = (props: Props) => {
  const { framework } = props
  const pathname = usePathname()

  return (
    <>
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
        href={`/${framework}/showcase`}
        aria-current={pathname.startsWith(`/${framework}/showcase`) ? 'page' : undefined}
      >
        Showcase
      </NavbarLink>
      <NavbarLink
        href={`/${framework}/plus`}
        aria-current={pathname.startsWith(`/${framework}/plus`) ? 'page' : undefined}
      >
        Plus
        <SparklesIcon />
      </NavbarLink>
    </>
  )
}
