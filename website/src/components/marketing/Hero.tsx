import { Button } from '@/components/shared/Button'
import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { Box, Container, Stack } from '@/panda/jsx'
import Link from 'next/link'

export const Hero = () => (
  <Container maxW="8xl" py="24">
    <Stack direction={{ base: 'column', md: 'row' }} gap="20" align="center">
      <Stack gap="8" flex="1">
        <Stack gap="6">
          <Heading textStyle="6xl" fontWeight="semibold">
            A UI framework made for enterprises
          </Heading>
          <Text textStyle="xl" color="fg.muted">
            Access fully customizable, accessible, and unstyled UI components that give you complete
            control over the styling of your webp app in React, Vue and Solid.js
          </Text>
        </Stack>
        <Stack direction="row" gap="3">
          <Link href="/docs/react/components/accordion">
            <Button size={{ base: 'xl', md: '2xl' }}>Explore now</Button>
          </Link>
          <Button size={{ base: 'xl', md: '2xl' }} variant="secondary">
            Learn more
          </Button>
        </Stack>
      </Stack>
      <Box bg="bg.subtle" flex="1" minH="600px" p="4" width="full">
        Placeholder Image
      </Box>
    </Stack>
  </Container>
)
