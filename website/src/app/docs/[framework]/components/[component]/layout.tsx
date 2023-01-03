import { Sidebar } from '@/components/navigation/Sidebar'
import { Text } from '@/components/shared/Text'
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
      <Box as="main" flex="1" py="12" maxWidth={{ xl: '43rem' }}>
        <Box>{props.children}</Box>
      </Box>

      <Box as="aside" position="sticky" display={{ base: 'none', xl: 'block' }} top="112px">
        <div>
          <Stack
            as="ul"
            gap="2"
            fontSize="sm"
            lineHeight="1.5rem"
            color="fg.muted"
            listStyle="none"
            ps="0"
          >
            <Box as="li">
              <Text color="accent.default" fontWeight="medium">
                Headline 0
              </Text>
            </Box>
            {['Headline 1', 'Headline 2', 'Headline 3', 'Headline 4'].map((headline) => (
              <Box as="li" key={headline}>
                <Text>{headline}</Text>
              </Box>
            ))}
          </Stack>
        </div>
      </Box>
    </Stack>
  )
}

export default DocsLayout
