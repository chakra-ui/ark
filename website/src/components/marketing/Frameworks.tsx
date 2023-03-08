import { ReactIcon } from '@/icons/React'
import { SolidIcon } from '@/icons/Solid'
import { VueIcon } from '@/icons/Vue'
import { Box, Container, panda, Stack } from '@/panda/jsx'
import { FiArrowRight } from 'react-icons/fi'
import { Button } from '../shared/Button'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const Frameworks = () => {
  const frameworks = [
    {
      heading: '@ark-ui/react',
      description: 'Start using headless components with React.js',
      href: '/docs/react/overview/introduction',
      icon: <ReactIcon width="44" />,
    },
    {
      heading: '@ark-ui/vue',
      description: 'Start using headless components with Vue.js',
      href: '/docs/vue/overview/introduction',
      icon: <VueIcon width="44" />,
    },
    {
      heading: '@ark-ui/solid',
      description: 'Start using headless components with Solid.js',
      href: '/docs/solid/overview/introduction',
      icon: <SolidIcon width="44" />,
    },
  ]
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap={{ base: '12', md: '16' }}>
        <Stack gap={{ base: '4', md: '5' }} maxW="xl">
          <Heading textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
            A single <panda.span color="accent.default">component library</panda.span> for <br />
            every framework
          </Heading>
          <Text color="fg.muted" textStyle={{ base: 'md', md: 'lg' }}>
            Ark is framework agnostic and doesn&apos;t impose any JS framework on you and your team.
            Use what you prefer
          </Text>
        </Stack>
        <Stack gap="8" direction={{ base: 'column', md: 'row' }} width="full">
          {frameworks.map(({ heading, description, href, icon }) => (
            <Box
              key={heading}
              background="bg.surface"
              borderRadius="lg"
              borderWidth="1px"
              p={{ base: '5', md: '6' }}
              width="full"
            >
              <Stack gap={{ base: '12', md: '16' }}>
                {icon}
                <Stack gap={{ base: '4', md: '5' }}>
                  <Stack gap={{ base: '1', md: '2' }}>
                    <Heading textStyle="lg" fontWeight="semibold">
                      {heading}
                    </Heading>
                    <Text textStyle="md" color="fg.muted">
                      {description}
                    </Text>
                  </Stack>
                  <Button
                    href={href}
                    variant="link"
                    size="lg"
                    color="accent.default"
                    rightIcon={<FiArrowRight />}
                  >
                    Get started
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}
