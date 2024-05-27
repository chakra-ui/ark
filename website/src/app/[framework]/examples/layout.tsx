import type { PropsWithChildren } from 'react'
import { Flex } from 'styled-system/jsx'
import { layout } from 'styled-system/recipes'
import { ExamplesNavbar } from '~/components/navigation/examples/examples-navbar'
import { ExamplesSidebar } from '~/components/navigation/examples/examples-sidebar'
import { SidebarContainer } from '~/components/navigation/sidebar-container'
import { fetchExample } from '~/lib/fetch-example'

const styles = layout()

interface Props {
  params: { component: string; framework: string; id: string }
}

export default async function Layout(props: PropsWithChildren<Props>) {
  const { framework } = props.params
  const groups = await fetch(`http://localhost:3001/api/${framework}/examples`, {
    headers: {
      Authorization: 'Basic YWRtaW46YWRtaW4=',
    },
  }).then((res) => res.json())

  return (
    <>
      <ExamplesNavbar />
      <Flex pt={{ base: '28', md: '16' }}>
        <SidebarContainer className={styles.aside}>
          <ExamplesSidebar groups={groups} />
        </SidebarContainer>
        <main className={styles.main}>{props.children}</main>
      </Flex>
    </>
  )
}
