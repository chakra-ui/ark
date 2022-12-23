import { Box, Container, Stack } from '@/panda/jsx'
import { PageButton } from '../navigation/PageButton'
import { Button } from '../shared/Button'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const Hero = () => (
  <Container py="24">
    <Stack direction={{ base: 'column', md: 'row' }} gap="20" align="center">
      <Stack gap="8" flex="1">
        <Stack gap="6">
          <Heading textStyle="6xl" fontWeight="semibold">
            The only UI library you will ever need
          </Heading>
          <Text textStyle="lg" color="fg.muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
            elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
          </Text>
        </Stack>
        <Stack direction="row" gap="3">
          <PageButton
            href="/docs/react/components/accordion"
            size={{ base: 'xl', md: '2xl' }}
            variant="primary"
          >
            Get Started
          </PageButton>
          <Button size={{ base: 'xl', md: '2xl' }} variant="secondary">
            Learn more!
          </Button>
        </Stack>
      </Stack>
      <Box bg="bg.subtle" flex="1" minH="600px" p="4" width="full">
        Placeholder Image
      </Box>
    </Stack>
  </Container>
)
