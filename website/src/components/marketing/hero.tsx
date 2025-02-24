import { ArrowRightIcon, RocketIcon } from 'lucide-react'
import NextLink from 'next/link'
import { Box, Container, HStack, Stack, styled } from 'styled-system/jsx'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { ReactIcon, SolidIcon, SvelteIcon, VueIcon } from './icons'

export const Hero = () => {
  return (
    <Box
      backgroundImage={{ base: 'none', md: 'url(/images/hero.svg)' }}
      _dark={{
        backgroundImage: { base: 'none', md: 'url(/images/hero_dark.svg)' },
      }}
      backgroundPosition="calc(50% + 250px) 25px"
      backgroundRepeat="no-repeat"
    >
      <Container pt={{ base: '16', md: '32' }} pb="8">
        <Stack gap={{ base: '6', md: '8' }} maxW="3xl">
          <Stack gap={{ base: '5', md: '6' }}>
            <Stack gap={{ base: '3', md: '4' }}>
              <NextLink href="/react/plus">
                <Badge size="lg" variant="outline">
                  <RocketIcon />
                  New: Launching Ark Plus
                  <ArrowRightIcon />
                </Badge>
              </NextLink>
              <Heading as="h1" fontWeight="bold" textStyle={{ base: '4xl', md: '6xl' }}>
                Fully <styled.span color="colorPalette.default">customizable</styled.span> and{' '}
                <styled.span color="colorPalette.default">accessible</styled.span> UI components
              </Heading>
            </Stack>
            <Text textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted">
              Ark UI is a headless UI library with over 45+ components designed to build reusable, scalable Design
              Systems that works for a wide range of JS frameworks.
            </Text>
          </Stack>
          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button asChild size={{ base: 'xl', md: '2xl' }}>
              <NextLink href="/react/docs/overview/introduction">Get Started</NextLink>
            </Button>
            <Button asChild size={{ base: 'xl', md: '2xl' }} variant="outline">
              <NextLink href="/react/docs/components/accordion">Show Components</NextLink>
            </Button>
          </Stack>
          <HStack gap="10">
            <HStack>
              <ReactIcon />
              <Text color="fg.muted">React</Text>
            </HStack>
            <HStack>
              <SolidIcon />
              <Text color="fg.muted">Solid</Text>
            </HStack>
            <HStack>
              <VueIcon />
              <Text color="fg.muted">Vue</Text>
            </HStack>
            <HStack>
              <SvelteIcon />
              <Text color="fg.muted">Svelte</Text>
            </HStack>
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
