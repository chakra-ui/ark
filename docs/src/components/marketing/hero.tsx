// import ReactIcon from './icons/react.astro'
// import SolidIcon from './icons/solid.astro'
// import VueIcon from './icons/vue.astro'
import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Box, Container, HStack, Stack } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Heading, Text } from '~/components/ui'

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
      <Container pt={{ base: '16', md: '32' }} pb={{ base: '16', md: '24' }} maxW="7xl">
        <Stack gap={{ base: '8', md: '12' }} maxW={{ lg: '3xl' }}>
          <Heading textStyle={{ base: '4xl', md: '6xl' }} fontWeight="bold">
            Fully <span className={css({ color: 'accent.default' })}>customizable</span> and{' '}
            <span className={css({ color: 'accent.default' })}>accessible</span> UI components
          </Heading>
          <Text textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted">
            Ark UI is a headless library for building reusable, scalable Design Systems that works
            for a wide range of JS frameworks.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <NextLink
              href="/docs/react/overview/introduction"
              className={button({ size: { base: 'xl', md: '2xl' } })}
            >
              Get Started
            </NextLink>
            <NextLink
              href="/docs/react/components/accordion"
              className={button({ size: { base: 'xl', md: '2xl' }, variant: 'outline' })}
            >
              Show Components
            </NextLink>
          </Stack>
          {/* <HStack gap="10">
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
          </HStack> */}
        </Stack>
      </Container>
    </Box>
  )
}
