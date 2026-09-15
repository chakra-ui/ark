import type { PropsWithChildren } from 'react'
import { css } from 'styled-system/css'
import { Box, Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { DocsNavbar } from '~/components/navigation/docs/docs-navbar'
import { DocsSidebar } from '~/components/navigation/docs/docs-sidebar'
import { DocsTabBar } from '~/components/navigation/docs/docs-tab-bar'
import { Navbar } from '~/components/navigation/navbar'
import { SidebarContainer } from '~/components/navigation/sidebar-container'
import { getLatestVersion } from '~/lib/latest-version'
import { getSidebarTabs } from '~/lib/sidebar'

const styles = layout()

const shell = css({
  '--navbar-height': '4rem',
  '--banner-height': '0px',
  '--tabbar-height': '3rem',
})

export default async function Layout(props: PropsWithChildren) {
  const tabs = getSidebarTabs()
  const version = await getLatestVersion()

  return (
    <Box className={shell}>
      <header>
        <Navbar />
      </header>
      <Box
        position="fixed"
        top="var(--navbar-height)"
        insetX="0"
        zIndex="20"
        background="var(--colors-bg-canvas)"
        display={{ base: 'none', md: 'block' }}
      >
        <DocsTabBar tabs={tabs} latestVersion={version} />
      </Box>
      <DocsNavbar tabs={tabs} />
      <Flex
        pt="calc(var(--navbar-height) + var(--banner-height) + var(--tabbar-height))"
        maxW="1440px"
        mx="auto"
        w="full"
      >
        <SidebarContainer className={styles.aside}>
          <DocsSidebar tabs={tabs} />
        </SidebarContainer>
        <main className={styles.main}>{props.children}</main>
      </Flex>
    </Box>
  )
}
