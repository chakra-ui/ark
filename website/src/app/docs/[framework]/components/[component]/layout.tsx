import { Sidebar } from '@/components/navigation/sidebar/Sidebar'
import { getComponentDocuments } from '@/lib/contentlayer'
import { Box, Container, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const sidebarItems = getComponentDocuments().map((doc) => ({
    name: doc.name,
    route: doc.route,
    isActive: doc.id === props.params.component,
  }))

  return (
    <Stack as={Container} gap="24" direction="row" height="100%" position="relative">
      <Sidebar items={sidebarItems} />
      <Box as="main" flex="1" py="12">
        <Box>{props.children}</Box>
      </Box>
    </Stack>
  )
}

export default DocsLayout
