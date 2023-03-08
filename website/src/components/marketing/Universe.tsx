import { ArkIcon } from '@/icons/Ark'
import { JSIcon } from '@/icons/JS'
import { ReactIcon } from '@/icons/React'
import { SolidIcon } from '@/icons/Solid'
import { VueIcon } from '@/icons/Vue'
import { Box, Container, Flex, FlexProps, panda, Stack } from '@/panda/jsx'
import { FiArrowRight } from 'react-icons/fi'
import { match } from 'ts-pattern'
import { Button } from '../shared/Button'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const Universe = () => (
  <Box
    backgroundImage={{ base: 'none', md: 'url(/images/pattern.svg)' }}
    _dark={{ backgroundImage: { base: 'none', md: 'url(/images/pattern_dark.svg)' } }}
    backgroundRepeat="repeat-x"
  >
    <Container pt={{ base: '16', md: '40' }}>
      <Heading textAlign="center" textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
        Accessible components. <br />
        Powered by <panda.span color="accent.default">State Machines</panda.span>
      </Heading>
    </Container>
    <Box
      backgroundImage="url(/images/universe.svg)"
      _dark={{ backgroundImage: 'url(/images/universe_dark.svg)' }}
      backgroundPosition="center center"
      backgroundRepeat="repeat-x"
    >
      <Container pt={{ base: '8', md: '10' }} pb={{ base: '8', md: '10' }}>
        <Stack direction="row" align="center" width="full" justify="space-evenly">
          {[
            { framework: 'React', icon: <ReactIcon width="48" /> },
            { framework: 'Vue', icon: <VueIcon width="48" /> },
            { framework: 'Ark', icon: <ArkIcon width="48" /> },
            { framework: 'Solid', icon: <SolidIcon width="48" /> },
            { framework: 'JS', icon: <JSIcon width="42" /> },
          ].map((item, id) =>
            match(item)
              .with({ framework: 'Ark' }, () => <Box key={id} width="358px" height="358px" />)
              .otherwise(() => <Orb key={id}>{item.icon}</Orb>),
          )}
        </Stack>
      </Container>
    </Box>
    <Container pb={{ base: '16', md: '24' }}>
      <Stack align="center" gap={{ base: '8', md: '10' }}>
        <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} textAlign="center" maxW="lg">
          Ark UI is an open-source library that allows developers to build components faster without
          sweating on functionality.
        </Text>
        <Button
          href="/docs/react/overview/introduction"
          size={{ base: 'lg', md: 'xl' }}
          rightIcon={<FiArrowRight />}
        >
          Get Started
        </Button>
      </Stack>
    </Container>
  </Box>
)

const Orb = (props: FlexProps) => (
  <Flex
    borderRadius="full"
    justify="center"
    align="center"
    borderWidth="2px"
    bg="orange.900"
    borderColor="orange.800"
    _dark={{
      bg: '#220C08',
      borderColor: 'orange.800',
    }}
    width="94px"
    height="94px"
    display={{ base: 'none', md: 'flex' }}
    {...props}
  />
)
