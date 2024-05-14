import { Braces, Keyboard, Orbit, Paintbrush } from 'lucide-react'
import { Container, Flex, Grid, Stack } from 'styled-system/jsx'
import { Heading, Text } from '~/components/ui'
import { CodeExamples } from './code-examples'

const features = [
  {
    icon: Paintbrush,
    title: 'Unstyled',
    description:
      'Style the components according to your design system, rather than being limited by predefined styles.',
  },
  {
    icon: Braces,
    title: 'Composable',
    description:
      'The components are built using a declarative syntax, which makes them easier to reason about and understand.',
  },
  {
    icon: Keyboard,
    title: 'Accessible',
    description:
      'Ark follows accessibility standards and guidelines, ensuring that the components can be accessed and used by all users.',
  },
  {
    icon: Orbit,
    title: 'Reliable',
    description:
      'Using state machines, Ark can help you create more reliable user interfaces, with less room for bugs and unexpected behavior.',
  },
]

export const Highlights = () => {
  return (
    <Container py={{ base: '16', md: '24' }} maxW="8xl">
      <Grid columns={{ base: 1, md: 2 }} gap={{ base: '16', lg: '24' }}>
        <Stack width="full" gap={{ base: '10', md: '12' }}>
          <Heading textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
            Composable API design for a delightful experience
          </Heading>
          <Stack gap="10">
            {features.map((feature) => (
              <Stack key={feature.title} direction="row" gap={{ base: '5', md: '6' }}>
                <Flex
                  align="center"
                  justify="center"
                  background="bg.default"
                  borderRadius="l2"
                  borderWidth="1px"
                  color="accent.default"
                  flexShrink={0}
                  height={{ base: '10', md: '12' }}
                  width={{ base: '10', md: '12' }}
                >
                  <feature.icon size="20" />
                </Flex>
                <Stack gap={{ base: '1', md: '2' }}>
                  <Heading textStyle="lg" fontWeight="semibold">
                    {feature.title}
                  </Heading>
                  <Text color="fg.muted">{feature.description}</Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <CodeExamples />
      </Grid>
    </Container>
  )
}
