import { Button } from '@/components/shared/Button'
import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { ReactIcon } from '@/icons/React'
import { SolidIcon } from '@/icons/Solid'
import { VueIcon } from '@/icons/Vue'
import { Container, HStack, panda, Stack } from '@/panda/jsx'
import Link from 'next/link'
import { MdContentCopy } from 'react-icons/md'

export const Hero = () => (
  <Container py={{ base: '16', md: '24' }}>
    <Stack gap={{ base: '8', md: '10' }} maxW="xl">
      <Stack gap="5">
        <Heading textStyle={{ base: '4xl', md: '5xl' }} fontWeight="semibold">
          Get fully customizable, <panda.span color="orange.400">accessible</panda.span> and{' '}
          <panda.span color="orange.400">unstyled</panda.span> UI components
        </Heading>
        <Text textStyle={{ base: 'md', md: 'lg' }} color="fg.muted">
          Ark UI is a headless library for building reusable, scalable Design Systems that works in
          any framework.
        </Text>
      </Stack>
      <Stack gap="8">
        <Stack direction={{ base: 'column', sm: 'row' }} gap="3" width="full" alignItems="stretch">
          <Link href="/docs/react/overview/introduction">
            <Button size={{ base: 'xl', md: 'xl' }} width="full">
              Get Started
            </Button>
          </Link>
          <HStack
            background="gray.100"
            _dark={{ background: 'brown.600' }}
            borderWidth="1px"
            borderRadius="lg"
            px="5"
            color="fg.emphasized"
          >
            <Text fontWeight="medium">npm i @ark-ui/react</Text>
            <MdContentCopy />
          </HStack>
        </Stack>
        <HStack gap="8">
          {[
            { framework: 'React', icon: <ReactIcon /> },
            { framework: 'Vue', icon: <VueIcon /> },
            { framework: 'Solid', icon: <SolidIcon /> },
          ].map(({ framework, icon }) => (
            <HStack key={framework} gap="1">
              {icon}
              <Text textStyle="md" color="fg.muted">
                {framework}
              </Text>
            </HStack>
          ))}
        </HStack>
      </Stack>
    </Stack>
  </Container>
)
