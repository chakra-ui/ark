'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { cva } from 'styled-system/css'

interface Props {
  framework: string
}

const link = cva({
  base: {
    borderBottomWidth: '1px',
    color: 'fg.muted',
    fontWeight: 'medium',
    p: '3',
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

export const MobileNavbarLinks = (props: Props) => {
  const { framework } = props
  const pathname = usePathname()

  return (
    <>
      <NextLink
        href={`/${framework}/docs/overview/introduction`}
        className={link}
        aria-current={pathname.startsWith(`/${framework}/docs`) ? 'page' : undefined}
      >
        Docs
      </NextLink>
      {/* <NextLink
        href={`/${framework}/examples`}
        className={link}
        aria-current={pathname.startsWith(`/${framework}/examples`) ? 'page' : undefined}
      >
        Examples
      </NextLink> */}
      <NextLink
        href={`/${framework}/showcase`}
        className={link}
        aria-current={pathname.startsWith(`/${framework}/showcase`) ? 'page' : undefined}
      >
        Showcase
      </NextLink>
    </>
  )
}
