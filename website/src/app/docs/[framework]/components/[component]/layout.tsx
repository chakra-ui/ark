import { Sidebar } from '@/components/navigation/Sidebar'
import { getComponentDocuments } from '@/lib/contentlayer'
import { Box, Container, panda, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const { params } = props
  const sidebarItems = getComponentDocuments(params.framework).map((doc) => ({
    name: doc.name,
    route: doc.route,
  }))

  return (
    <Container maxW="8xl">
      <Stack gap="24" direction="row" height="100%" position="relative">
        <Sidebar
          framework={params.framework}
          items={sidebarItems}
          activePath={`/docs/${params.framework}/components/${params.component}`}
        />
        <panda.main flex="1" overflow="hidden" py="12">
          <Box>{props.children}</Box>
        </panda.main>
      </Stack>
    </Container>
  )
}

export default DocsLayout
