import { ReactIcon } from '@/icons/React'
import { SolidIcon } from '@/icons/Solid'
import { VueIcon } from '@/icons/Vue'
import { Box, Container, Stack, styled } from '@/panda/jsx'
import { FiArrowRight } from 'react-icons/fi'
import { Button } from '../shared/Button'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const Frameworks = () => {
  const frameworks = [
    {
      heading: '@ark-ui/react',
      description: 'Start using headless Ark UI Components with React.js',
      href: '/docs/react/overview/introduction',
      icon: <ReactIcon height="44" />,
    },
    {
      heading: '@ark-ui/vue',
      description: 'Start using headless Ark UI Components with Vue.js',
      href: '/docs/vue/overview/introduction',
      icon: <VueIcon height="44" />,
    },
    {
      heading: '@ark-ui/solid',
      description: 'Start using headless Ark UI Components with Solid.js',
      href: '/docs/solid/overview/introduction',
      icon: <SolidIcon height="44" />,
    },
  ]
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap={{ base: '12', md: '16' }}>
        <Stack gap={{ base: '4', md: '5' }} maxW="xl">
          <Heading textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
            A versatile <styled.span color="accent.default">component library</styled.span> for
            every framework
          </Heading>
          <Text color="fg.muted" textStyle={{ base: 'md', md: 'lg' }}>
            With Ark, you have the freedom to choose the framework that suits your team&apos;s needs
            and preferences.
          </Text>
        </Stack>
        <Stack gap={{ base: '6', md: '8' }} direction={{ base: 'column', md: 'row' }} width="full">
          {frameworks.map(({ heading, description, href, icon }) => (
            <Box
              key={heading}
              background="bg.surface"
              borderRadius="lg"
              borderWidth="1px"
              p={{ base: '5', md: '6' }}
              width="full"
            >
              <Stack gap={{ base: '12', md: '16' }} alignItems="start">
                {icon}
                <Stack gap={{ base: '4', md: '5' }} alignItems="start">
                  <Stack gap={{ base: '1', md: '2' }}>
                    <Heading textStyle="lg" fontWeight="semibold">
                      {heading}
                    </Heading>
                    <Text color="fg.muted" maxW="20rem">
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
