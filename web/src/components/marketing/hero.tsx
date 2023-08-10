'use client'
import NextLink from 'next/link'
import { FiCheck } from 'react-icons/fi'
import { Box, Container, HStack, Stack, styled } from 'styled-system/jsx'
import { useCopyToClipboard } from 'usehooks-ts'
import { Button } from '~/components/ui/button'
import { Heading, Typography } from '~/components/ui/typography'
import { ReactIcon } from './icons/react'
import { SolidIcon } from './icons/solid'
import { VueIcon } from './icons/vue'

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
          <Stack gap={{ base: '4', md: '6' }} maxW={{ lg: '3xl' }}>
            <Heading textStyle={{ base: '4xl', md: '6xl' }}>
              Fully <styled.span color="accent.default">customizable</styled.span> and{' '}
              <styled.span color="accent.default">accessible</styled.span> UI components
            </Heading>
            <Typography textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted">
              Ark UI is a headless library for building reusable, scalable Design Systems that works
              for a wide range of JS frameworks.
            </Typography>
          </Stack>
          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button size={{ base: 'xl', md: '2xl' }} asChild>
              <NextLink href="/docs/react/overview/introduction">Get Started</NextLink>
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
                <Typography color="fg.muted">{framework}</Typography>
              </HStack>
            ))}
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
