import type { PropsWithChildren } from 'react'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Stack } from 'styled-system/jsx'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { ReactIcon, SolidIcon, SvelteIcon, VueIcon } from './icons'

export const Universe = () => {
  return (
    <>
      <Box
        backgroundImage={{
          base: 'url(/images/pattern.svg)',
          _dark: 'url(/images/pattern_dark.svg)',
        }}
        backgroundRepeat="repeat-x"
        width="full"
        mt={{ base: '16', md: '24' }}
      >
        <Container pt={{ base: '16', md: '40' }}>
          <Heading textAlign="center" textStyle="4xl" maxW="3xl" mx="auto" fontWeight="semibold">
            Driven by <span className={css({ color: 'accent.default' })}>State Machines</span>
            <br /> to make your life easier.
          </Heading>
        </Container>
      </Box>
      <Box
        backgroundImage={{
          base: 'url(/images/universe.svg)',
          _dark: 'url(/images/universe_dark.svg)',
        }}
        backgroundPosition="center center"
        backgroundRepeat="repeat-x"
        width="full"
      >
        <Container pt={{ base: '8', md: '10' }} pb={{ base: '8', md: '10' }}>
          <Stack direction="row" align="center" width="full" justify="space-evenly">
            <Icon>
              <ReactIcon width="48" />
            </Icon>
            <Icon>
              <VueIcon width="48" />
            </Icon>
            <Box width="358px" height="358px" />
            <Icon>
              <SolidIcon width="48" />
            </Icon>
            <Icon>
              <SvelteIcon width="48" />
            </Icon>
          </Stack>
        </Container>
      </Box>
      <Container pb={{ base: '16', md: '24' }}>
        <Stack align="center" gap={{ base: '8', md: '10' }}>
          <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} textAlign="center" maxW="3xl">
            Utilizing state machines, Ark UI substantially cuts down on errors while ensuring
            predictable behavior in every component. Develop with confidence.
          </Text>
        </Stack>
      </Container>
    </>
  )
}

const Icon = (props: PropsWithChildren) => (
  <Flex
    borderRadius="full"
    justify="center"
    align="center"
    borderWidth="2px"
    borderColor={{
      _light: '#F6E1DB',
      _dark: '#391915',
    }}
    bg="bg.canvas"
    width="24"
    height="24"
    display={{ base: 'none', md: 'flex' }}
    {...props}
  />
)
