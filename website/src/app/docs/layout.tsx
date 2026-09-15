import type { PropsWithChildren } from 'react'
import { Box, Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { DocsNavbar } from '~/components/navigation/docs/docs-navbar'
import { DocsSidebar } from '~/components/navigation/docs/docs-sidebar'
import { DocsTabBar } from '~/components/navigation/docs/docs-tab-bar'
import { Navbar } from '~/components/navigation/navbar'
import { SidebarContainer } from '~/components/navigation/sidebar-container'
import { getSidebarTabs } from '~/lib/sidebar'

const styles = layout()

export default function Layout(props: PropsWithChildren) {
  const tabs = getSidebarTabs()

  return (
    <>
      <header>
        <Navbar />
      </header>
      <Box position="fixed" top="16" left="0" right="0" zIndex="3" display={{ base: 'none', md: 'block' }}>
        <DocsTabBar tabs={tabs} />
      </Box>
      <DocsNavbar tabs={tabs} />
      <Flex pt={{ base: '28', md: '28' }}>
        <SidebarContainer className={styles.aside}>
          <Box pt={{ md: '14' }}>
            <DocsSidebar tabs={tabs} />
          </Box>
        </SidebarContainer>
        <main className={styles.main}>{props.children}</main>
      </Flex>
    </>
  )
}
