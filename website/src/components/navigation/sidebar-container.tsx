import NextLink from 'next/link'
import type { PropsWithChildren } from 'react'
import { cx } from 'styled-system/css'
import { Box, HStack } from 'styled-system/jsx'
import { Logo } from '~/components/logo'
import { getFramework } from '~/lib/frameworks'
import { VersionSelect } from './version-select'

interface Props {
  className?: string
}

export const SidebarContainer = async (props: PropsWithChildren<Props>) => {
  const { className } = props

  const framework = await getFramework()
  const version = await fetchLatestVersion(framework)

  return (
    <aside className={cx('scroller', className)}>
      <Box py="4.5" position="sticky" top="0" bg="inherit" zIndex="sticky" borderBottomWidth="1px">
        <HStack justifyContent="space-between">
          <NextLink href="/" aria-label="Go to start page">
            <Logo />
          </NextLink>
          <div id="version-select">
            <VersionSelect latest={version} />
          </div>
        </HStack>
      </Box>
      {props.children}
    </aside>
  )
}

const fetchLatestVersion = async (framework: string) => {
  const response = await fetch(`https://registry.npmjs.org/@ark-ui/${framework}/latest`, {
    cache: 'no-cache',
  })
  const data = await response.json()

  return data.version as string
}
