import { Sidebar } from '@/components/navigation/Sidebar'
import { getComponentDocuments } from '@/lib/contentlayer'
import { Box, Container, panda, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const sidebarItems = getComponentDocuments().map((doc) => ({
    name: doc.name,
    route: doc.route,
    isActive: doc.id === props.params.component,
  }))

  return (
    <Container maxW="8xl">
      <Stack gap="24" direction="row" height="100%" position="relative">
        <Sidebar items={sidebarItems} />
        <panda.main flex="1" py="12">
          <Box>{props.children}</Box>
        </panda.main>
      </Stack>
    </Container>
  )
}

export default DocsLayout
