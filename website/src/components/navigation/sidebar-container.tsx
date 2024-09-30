import NextLink from 'next/link'
import type { PropsWithChildren } from 'react'
import { Box, HStack } from 'styled-system/jsx'
import { Logo } from '~/components/logo'
import { getServerContext } from '~/lib/server-context'
import { VersionSelect } from './version-select'

interface Props {
  className?: string
}

export const SidebarContainer = async (props: PropsWithChildren<Props>) => {
  const { className } = props
  const { framework } = getServerContext()

  const version = await fetchLatestVersion(framework)

  return (
    <aside className={className}>
      <Box py="4.5" position="sticky" top="0" bg="inherit" zIndex="sticky" borderBottomWidth="1px">
        <HStack justifyContent="space-between">
          <NextLink href="/" aria-label="Go to start page">
            <Logo />
          </NextLink>
          <VersionSelect latest={version} />
        </HStack>
      </Box>
      {props.children}
    </aside>
  )
}

const fetchLatestVersion = async (framework: string) => {
  const response = await fetch(`https://registry.npmjs.org/@ark-ui/${framework}/latest`)
  const data = await response.json()

  return data.version as string
}
