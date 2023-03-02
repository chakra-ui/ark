import { Button } from '@/components/shared/Button'
import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { Container, panda, Stack } from '@/panda/jsx'
import Link from 'next/link'

export const Hero = () => (
  <Container py={{ base: '16', md: '24' }}>
    <Stack gap={{ base: '8', md: '10' }} maxW="xl">
      <Stack gap="5">
        <Heading textStyle={{ base: '4xl', md: '5xl' }} fontWeight="semibold">
          Get fully customizable, <panda.span color="orange.400">accessible</panda.span>, and{' '}
          <panda.span color="orange.400">unstyled</panda.span> UI components
        </Heading>
        <Text textStyle={{ base: 'md', md: 'lg' }} color="fg.muted">
          Ark UI is a headless library for building reusable, scalable Design Systems that works in
          any framework
        </Text>
      </Stack>
      <Stack direction={{ base: 'column', sm: 'row' }} gap="3" width="full" alignItems="stretch">
        <Link href="/docs/react/overview/introduction">
          <Button size={{ base: 'xl', md: 'xl' }} width="full">
            Get Started
          </Button>
        </Link>
        <Button size={{ base: 'xl', md: 'xl' }} variant="secondary">
          npm i @ark-ui/react
        </Button>
      </Stack>
    </Stack>
  </Container>
)
