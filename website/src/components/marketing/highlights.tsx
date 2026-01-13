import { Braces, Keyboard, Orbit, Paintbrush } from 'lucide-react'
import { Container, Flex, Grid, Stack } from 'styled-system/jsx'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { CodeExamples } from './code-examples'

const features = [
  {
    icon: Paintbrush,
    title: 'Truly Headless',
    description: 'No default styles to fight. Bring your own CSS — Panda, Tailwind, CSS-in-JS, or plain stylesheets.',
  },
  {
    icon: Braces,
    title: 'Framework Agnostic',
    description: 'Write once, use everywhere. The same API works across React, Solid, Vue, and Svelte.',
  },
  {
    icon: Keyboard,
    title: 'Accessible by Default',
    description: 'WAI-ARIA patterns baked in. Keyboard navigation and screen reader support out of the box.',
  },
  {
    icon: Orbit,
    title: 'State Machine Powered',
    description: 'Predictable behavior you can rely on. Complex interactions handled with edge cases covered.',
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
            <Stack key={feature.title} gap={{ base: '3', md: '4' }} height="full" justify="flex-start">
              <Flex
                align="center"
                justify="center"
                background="bg.default"
                borderRadius="l2"
                borderWidth="1px"
                color="colorPalette.default"
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
