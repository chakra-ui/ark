import type { PropsWithChildren } from 'react'
import { Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { DocsNavbar } from '~/components/navigation/docs/docs-navbar'
import { DocsSidebar } from '~/components/navigation/docs/docs-sidebar'
import { SidebarContainer } from '~/components/navigation/sidebar-container'
import { getSidebarGroups } from '~/lib/sidebar'

const styles = layout()

export default function Layout(props: PropsWithChildren) {
  const groups = getSidebarGroups()

  return (
    <>
      <DocsNavbar />
      <Flex pt={{ base: '28', md: '16' }}>
        <SidebarContainer className={styles.aside}>
          <DocsSidebar groups={groups} />
        </SidebarContainer>
        <main className={styles.main}>{props.children}</main>
      </Flex>
    </>
  )
}
