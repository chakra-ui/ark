import { Sidebar } from '@/components/navigation/Sidebar'
import { getComponentDocuments } from '@/lib/contentlayer'
import { Container, panda, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const { params } = props
  const sidebarItems = getComponentDocuments(params.framework).map((doc) => ({
    name: doc.name,
    route: doc.route,
  }))

  return (
    <Container maxW="8xl">
      <Stack gap="24" direction="row">
        <Sidebar
          framework={params.framework}
          items={sidebarItems}
          activePath={`/docs/${params.framework}/changelog`}
        />
        <panda.main flex="1" overflow="hidden" py="12">
          {props.children}
        </panda.main>
      </Stack>
    </Container>
  )
}

export default DocsLayout
