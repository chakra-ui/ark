import type { PropsWithChildren } from 'react'
import { Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { ExamplesNavbar } from '~/components/navigation/examples/examples-navbar'
import { ExamplesSidebar } from '~/components/navigation/examples/examples-sidebar'
import { SidebarContainer } from '~/components/navigation/sidebar-container'

const styles = layout()

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <ExamplesNavbar />
      <Flex pt={{ base: '28', md: '16' }}>
        <SidebarContainer className={styles.aside}>
          <ExamplesSidebar groups={[]} />
        </SidebarContainer>
        <main className={styles.main}>{props.children}</main>
      </Flex>
    </>
  )
}
