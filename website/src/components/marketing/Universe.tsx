import { ArkIcon } from '@/icons/Ark'
import { JSIcon } from '@/icons/JS'
import { ReactIcon } from '@/icons/React'
import { SolidIcon } from '@/icons/Solid'
import { VueIcon } from '@/icons/Vue'
import { Box, Container, Flex, FlexProps, panda, Stack } from '@/panda/jsx'
import Link from 'next/link'
import { match } from 'ts-pattern'
import { Button } from '../shared/Button'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const Universe = () => {
  return (
    <Box background="url(/images/pattern.svg) repeat-x">
      <Container pt="64" pb={{ base: '16', md: '24' }}>
        <Stack align="center" gap="10">
          <Heading textAlign="center" textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
            Accessible components. <br />
            Powered by <panda.span color="accent.default">State Machines</panda.span>
          </Heading>
          <Stack direction="row" align="center" gap="10" width="full" justify="space-between">
            {[
              { framework: 'React', icon: <ReactIcon width="48" /> },
              { framework: 'Vue', icon: <VueIcon width="48" /> },
              { framework: 'Ark', icon: <ArkIcon width="48" /> },
              { framework: 'Solid', icon: <SolidIcon width="48" /> },
              { framework: 'JS', icon: <JSIcon width="42" /> },
            ].map((item, id) =>
              match(item)
                .with({ framework: 'Ark' }, () => <ArkOrb key={id} />)
                .otherwise(() => (
                  <Circle key={id} bg="#220C08" borderColor="orange.900" width="24" height="24">
                    {item.icon}
                  </Circle>
                )),
            )}
          </Stack>
          <Text color="gray.400" textStyle={{ base: 'lg', md: 'xl' }} textAlign="center" maxW="lg">
            Ark UI is an open-source library that allows developers to build components faster
            without sweating on functionality.
          </Text>
          <Link href="/docs/react/overview/introduction">
            <Button size={{ base: 'lg', md: 'xl' }} width="full">
              Get Started
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}

const ArkOrb = () => (
  <Circle bg="orange.800" width="72" height="72" borderColor="orange.800">
    <Circle bg="orange.700" width="60" height="60" borderColor="rgba(255, 255, 255, 0.03)">
      <Circle bg="orange.600" width="44" height="44" borderColor="rgba(255, 255, 255, 0.07)">
        <Circle bg="orange.500" width="24" height="24" borderColor="rgba(255, 255, 255, 0.21)">
          <ArkIcon width="44" />
        </Circle>
      </Circle>
    </Circle>
  </Circle>
)
const Circle = (props: FlexProps) => (
  <Flex borderRadius="full" justify="center" align="center" borderWidth="2px" {...props} />
)
