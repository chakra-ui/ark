'use client'
import { Button } from '@/components/shared/Button'
import { Text } from '@/components/shared/Text'
import { ReactIcon } from '@/icons/React'
import { SolidIcon } from '@/icons/Solid'
import { VueIcon } from '@/icons/Vue'
import { Box, Container, HStack, Stack, styled } from '@/panda/jsx'
import { FiCheck } from 'react-icons/fi'
import { useCopyToClipboard } from 'usehooks-ts'
import { Heading } from '../ui/text'

export const Hero = () => {
  const [value, copy] = useCopyToClipboard()
  return (
    <Box
      backgroundImage={{ base: 'none', md: 'url(/images/hero.svg)' }}
      _dark={{
        backgroundImage: { base: 'none', md: 'url(/images/hero_dark.svg)' },
      }}
      backgroundPosition="calc(50% + 250px) 25px"
      backgroundRepeat="no-repeat"
    >
      <Container py={{ base: '16', md: '24' }}>
        <Stack gap={{ base: '8', md: '12' }}>
          <Stack gap={{ base: '4', md: '6' }} maxW={{ lg: '2xl' }}>
            <Heading textStyle={{ base: '4xl', md: '6xl' }}>
              Get customizable, <styled.span color="accent.default">accessible</styled.span> and{' '}
              <styled.span color="accent.default">unstyled</styled.span> UI components
            </Heading>
            <Text textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted">
              Ark UI is a headless library for building reusable, scalable Design Systems that works
              for a wide range of JS frameworks.
            </Text>
          </Stack>
          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button href="/docs/react/overview/introduction" size={{ base: 'xl', md: '2xl' }}>
              Get Started
            </Button>
            <Button variant="secondary" size={{ base: 'xl', md: '2xl' }}>
              npm i @ark-ui/react <FiCheck />
            </Button>
          </Stack>
          <HStack gap={{ base: '10', md: '12' }}>
            {[
              { framework: 'React', icon: <ReactIcon width="30" /> },
              { framework: 'Vue', icon: <VueIcon width="30" /> },
              { framework: 'Solid', icon: <SolidIcon width="30" /> },
            ].map(({ framework, icon }) => (
              <HStack key={framework} gap="2">
                {icon}
                <Text color="fg.muted">{framework}</Text>
              </HStack>
            ))}
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
