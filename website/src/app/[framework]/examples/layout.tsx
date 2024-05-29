import type { PropsWithChildren } from 'react'
import { Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { ExamplesNavbar } from '~/components/navigation/examples/examples-navbar'
import { ExamplesSidebar } from '~/components/navigation/examples/examples-sidebar'
import { SidebarContainer } from '~/components/navigation/sidebar-container'
import { fetchExamplesGroupedByCategory } from '~/lib/examples'

const styles = layout()

interface Props {
  params: { component: string; framework: string; id: string }
}

const exampleGroups = await fetchExamplesGroupedByCategory()

export default async function Layout(props: PropsWithChildren<Props>) {
  return (
    <>
      <ExamplesNavbar>
        <ExamplesSidebar groups={exampleGroups} />
      </ExamplesNavbar>
      <Flex pt={{ base: '28', md: '16' }}>
        <SidebarContainer className={styles.aside}>
          <ExamplesSidebar groups={exampleGroups} />
        </SidebarContainer>
        <main className={styles.main}>{props.children}</main>
      </Flex>
    </>
  )
}
