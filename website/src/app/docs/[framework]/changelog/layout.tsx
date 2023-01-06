import { Sidebar } from '@/components/navigation/Sidebar'
import { getComponentDocuments } from '@/lib/contentlayer'
import { Box, Container, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const { params } = props
  const sidebarItems = getComponentDocuments(params.framework).map((doc) => ({
    name: doc.name,
    route: doc.route,
  }))

  return (
    <Stack as={Container} gap="24" direction="row" height="100%" position="relative">
      <Sidebar
        framework={params.framework}
        items={sidebarItems}
        activePath={`/docs/${params.framework}/changelog`}
      />
      <Box as="main" flex="1" py="12">
        {props.children}
      </Box>
    </Stack>
  )
}

export default DocsLayout
