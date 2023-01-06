import { Sidebar } from '@/components/navigation/Sidebar'
import { getComponentDocuments } from '@/lib/contentlayer'
import { Box, Container, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const { params } = props
  const sidebarItems = getComponentDocuments(params.framework).map((doc) => ({
    name: doc.name,
    route: doc.route,
    isActive: false,
  }))

  return (
    <Stack as={Container} gap="24" direction="row" height="100%" position="relative">
      <Sidebar items={sidebarItems} />
      <Box as="main" flex="1" py="12">
        {props.children}
      </Box>
    </Stack>
  )
}

export default DocsLayout
