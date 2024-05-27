import NextLink from 'next/link'
import type { PropsWithChildren } from 'react'
import { Box } from 'styled-system/jsx'
import { Logo } from '~/components/logo'

interface Props {
  className?: string
}

export const SidebarContainer = (props: PropsWithChildren<Props>) => {
  const { className } = props
  return (
    <aside className={className}>
      <Box py="4.5" position="sticky" top="0" bg="inherit" zIndex="sticky" borderBottomWidth="1px">
        <NextLink href="/" aria-label="Go to start page">
          <Logo />
        </NextLink>
      </Box>
      {props.children}
    </aside>
  )
}
