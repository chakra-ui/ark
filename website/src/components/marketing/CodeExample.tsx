'use client'
import { Flex } from '@/panda/jsx'
import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import { Box } from 'panda/jsx/box'
import { Container } from 'panda/jsx/container'
import { Stack } from 'panda/jsx/stack'
import { tabs } from 'panda/recipes/tabs'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const CodeExample = () => {
  const features = [
    {
      heading: 'Modular',
      description: 'Access granular component parts giving you full control over styling',
    },
    {
      heading: 'Unstyled',
      description: 'No need override styles. Use any CSS framework you love',
    },
    {
      heading: 'Accessible',
      description: 'From focus management to screen reader, or ARIA attributes',
    },
    {
      heading: 'Robust',
      description: 'Ark UI components are state machines, so they work with any major framework.',
    },
  ]
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap="24" direction={{ base: 'column', md: 'row' }}>
        <Stack width="full" gap={{ base: '10', md: '12' }}>
          <Heading textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
            Composable API design for a delightful experience
          </Heading>
          <Stack gap="10">
            {features.map(({ heading, description }) => (
              <Stack key={heading} direction="row" gap={{ base: '5', md: '6' }}>
                <Box
                  width={{ base: '10', md: '12' }}
                  height={{ base: '10', md: '12' }}
                  background="orange.800"
                  borderRadius="full"
                  flexShrink={0}
                />
                <Stack gap={{ base: '1', md: '2' }}>
                  <Heading textStyle="lg" fontWeight="semibold">
                    {heading}
                  </Heading>
                  <Text color="fg.muted">{description}</Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Flex
          bg="gray.100"
          width="full"
          _dark={{ bg: 'brown.600' }}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Tabs className={tabs({})} defaultValue="React">
            <TabList>
              {['React', 'Vue', 'Solid'].map((value) => (
                <TabTrigger key={value} value={value}>
                  <button>{value}</button>
                </TabTrigger>
              ))}
              <TabIndicator />
            </TabList>
            <TabContent value="React">React Code Example</TabContent>
            <TabContent value="Vue">Vue Code Example</TabContent>
            <TabContent value="Solid">Solid Code Example</TabContent>
          </Tabs>
        </Flex>
      </Stack>
    </Container>
  )
}
