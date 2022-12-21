import { Box, Container, Stack } from '../../../../../../panda/jsx'
import { Text } from '../../../../../components/shared/Text'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container as="main">
      <Stack gap="24" direction="row" height="100%" position="relative">
        {/* <Sidebar /> */}
        <Box flex="1" py="8" maxWidth={{ xl: '43rem' }}>
          <Box>{children}</Box>
          {/* <Pagination page={page} /> */}
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
    </Container>
  )
}
