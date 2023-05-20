'use client'
import { Button } from '@/components/shared/Button'
import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { ReactIcon } from '@/icons/React'
import { SolidIcon } from '@/icons/Solid'
import { VueIcon } from '@/icons/Vue'
import { Box, Container, HStack, panda, Stack } from '@/panda/jsx'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { useCopyToClipboard } from 'usehooks-ts'
import { IconButton } from '../shared/IconButton'

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
        <Stack gap={{ base: '8', md: '10' }} maxW="xl">
          <Stack gap="5">
            <Heading textStyle={{ base: '4xl', md: '5xl' }} fontWeight="semibold">
              Get fully customizable, <panda.span color="accent.default">accessible</panda.span> and{' '}
              <panda.span color="accent.default">unstyled</panda.span> UI components
            </Heading>
            <Text textStyle={{ base: 'md', md: 'lg' }} color="fg.muted">
              Ark UI is a headless library for building reusable, scalable Design Systems that works
              for a wide range of JS frameworks.
            </Text>
          </Stack>
          <Stack gap="8" width="100%">
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              gap="3"
              alignItems="stretch"
              width="full"
            >
              <Button href="/docs/react/overview/introduction" size={{ base: 'lg', md: 'xl' }}>
                Get Started
              </Button>

              <HStack
                background="bg.surface"
                borderWidth="1px"
                borderRadius="lg"
                px="5"
                color="fg.emphasized"
                justify="center"
                minH="11"
              >
                <Text fontWeight="medium">npm i @ark-ui/react</Text>
                <IconButton
                  icon={value ? <FiCheck /> : <FiCopy />}
                  size="sm"
                  variant="tertiary"
                  onClick={() => copy('npm i @ark-ui/react')}
                  aria-label="Copy to clipboard"
                />
              </HStack>
            </Stack>
            <HStack gap="8">
              {[
                { framework: 'React', icon: <ReactIcon width="20" /> },
                { framework: 'Vue', icon: <VueIcon width="20" /> },
                { framework: 'Solid', icon: <SolidIcon width="20" /> },
              ].map(({ framework, icon }) => (
                <HStack key={framework}>
                  <Box fontSize="lg">{icon}</Box>
                  <Text color="fg.muted">{framework}</Text>
                </HStack>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
