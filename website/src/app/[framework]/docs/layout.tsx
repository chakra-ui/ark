import NextLink from 'next/link'
import type { PropsWithChildren } from 'react'
import { Box, Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { Logo } from '~/components/logo'
import { DocsNavbar } from '~/components/navigation/docs/docs-navbar'
import { Sidebar } from '~/components/navigation/docs/sidebar'
import { getSidebarGroups } from '~/lib/sidebar'

const styles = layout()

export default function Layout(props: PropsWithChildren) {
  const groups = getSidebarGroups()

  return (
    <>
      <DocsNavbar />
      <Flex pt={{ base: '28', md: '16' }}>
        <aside className={styles.aside}>
          <Box py="4.5">
            <NextLink href="/" aria-label="Go to start page">
              <Logo />
            </NextLink>
          </Box>
          <Sidebar groups={groups} />
        </aside>
        <main className={styles.main}>{props.children}</main>
      </Flex>
    </>
  )
}
