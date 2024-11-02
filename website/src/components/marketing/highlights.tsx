import { Braces, Keyboard, Orbit, Paintbrush } from 'lucide-react'
import { Container, Flex, Grid, Stack } from 'styled-system/jsx'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { CodeExamples } from './code-examples'

const features = [
  {
    icon: Paintbrush,
    title: 'Zero-Styling Freedom',
    description:
      'Your design system, your rules. Every component starts as a blank canvas ready for your creativity.',
  },
  {
    icon: Braces,
    title: 'Truly Composable',
    description:
      'Build complex UIs effortlessly with modular components that work seamlessly together.',
  },
  {
    icon: Keyboard,
    title: 'Accessibility-First',
    description:
      'Ship with confidence. Every component is WCAG compliant and thoroughly tested for accessibility.',
  },
  {
    icon: Orbit,
    title: 'State Machine Powered',
    description:
      'Predictable behavior, fewer bugs. State machines ensure rock-solid component interactions.',
  },
]

export const Highlights = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Grid columns={{ base: 1, md: 2 }} gap={{ base: '8', lg: '24' }}>
        <Grid
          columns={{ base: 1, sm: 2 }}
          gap={{ base: '8', lg: '12' }}
          justifyContent="center"
          alignContent="center"
          alignItems="stretch"
          height="full"
        >
          {features.map((feature) => (
            <Stack
              key={feature.title}
              gap={{ base: '3', md: '4' }}
              height="full"
              justify="flex-start"
            >
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
              <Heading as="h3" textStyle={{ base: 'lg', md: '2xl' }} fontWeight="semibold">
                {feature.title}
              </Heading>
              <Text color="fg.muted">{feature.description}</Text>
            </Stack>
          ))}
        </Grid>
        <CodeExamples />
      </Grid>
    </Container>
  )
}
