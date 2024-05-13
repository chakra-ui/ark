// import ReactIcon from './icons/react.astro'
// import SolidIcon from './icons/solid.astro'
// import VueIcon from './icons/vue.astro'
import NextLink from 'next/link'
import { Box, Container, HStack, Stack, styled } from 'styled-system/jsx'
import { Button, Heading, Text } from '~/components/ui'

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
      <Container pt={{ base: '16', md: '32' }} pb={{ base: '16', md: '24' }} maxW="8xl">
        <Stack gap={{ base: '8', md: '12' }} maxW="3xl">
          <Stack gap={{ base: '4', md: '6' }}>
            <Heading fontWeight="bold" textStyle={{ base: '4xl', md: '6xl' }}>
              Fully <styled.span color="accent.default">customizable</styled.span> and{' '}
              <styled.span color="accent.default">accessible</styled.span> UI components
            </Heading>
            <Text textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted">
              Ark UI is a headless library for building reusable, scalable Design Systems that works
              for a wide range of JS frameworks.
            </Text>
          </Stack>
          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button asChild size={{ base: 'xl', md: '2xl' }}>
              <NextLink href="/docs/react/overview/introduction">Get Started</NextLink>
            </Button>
            <Button asChild size={{ base: 'xl', md: '2xl' }} variant="outline">
              <NextLink href="/docs/react/components/accordion">Show Components</NextLink>
            </Button>
          </Stack>
          <HStack gap={{ base: '3', sm: '4' }}>
            <Box>Icons</Box>
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
