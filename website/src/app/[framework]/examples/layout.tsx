import type { PropsWithChildren } from 'react'
import { Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { ExamplesNavbar } from '~/components/navigation/examples/examples-navbar'
import { ExamplesSidebar } from '~/components/navigation/examples/examples-sidebar'
import { SidebarContainer } from '~/components/navigation/sidebar-container'

const styles = layout()

interface Props {
  params: { component: string; framework: string; id: string }
}

const { ARK_PLUS_API_KEY, ARK_PLUS_URL } = process.env

export default async function Layout(props: PropsWithChildren<Props>) {
  const { framework } = props.params
  const groups = await fetch(`${ARK_PLUS_URL}/api/${framework}/examples`, {
    headers: {
      Authorization: ARK_PLUS_API_KEY,
    },
  }).then((res) => res.json())

  return (
    <>
      <ExamplesNavbar>
        <ExamplesSidebar groups={groups} />
      </ExamplesNavbar>
      <Flex pt={{ base: '28', md: '16' }}>
        <SidebarContainer className={styles.aside}>
          <ExamplesSidebar groups={groups} />
        </SidebarContainer>
        <main className={styles.main}>{props.children}</main>
      </Flex>
    </>
  )
}
