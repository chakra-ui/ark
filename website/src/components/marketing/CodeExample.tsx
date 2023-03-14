'use client'
import { css } from '@/panda/css'
import { Flex } from '@/panda/jsx'
import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import { Container } from 'panda/jsx/container'
import { Stack } from 'panda/jsx/stack'
import { tabs } from 'panda/recipes/tabs'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { BsPalette } from 'react-icons/bs'
import { MdOutlineAccessibleForward } from 'react-icons/md'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const CodeExample = () => {
  const features = [
    {
      heading: 'Compsable',
      description:
        'The components are built using a declarative syntax, which makes them easier to reason about and understand.',
      icon: <AiOutlineAppstoreAdd />,
    },
    {
      heading: 'Themeable',
      description:
        'Style the components according to your design system, rather than being limited by predefined styles.',
      icon: <BsPalette />,
    },
    {
      heading: 'Accessible',
      description:
        'Ark follows accessibility standards and guidelines, ensuring that the components can be accessed and used by all users.',
      icon: <MdOutlineAccessibleForward />,
    },
    {
      heading: 'Reliable',
      description:
        'Using state machines, Ark can help you create more reliable user interfaces, with less room for bugs and unexpected behavior.',
      icon: <VscWorkspaceTrusted />,
    },
  ]
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap={{ base: '16', md: '24' }} direction={{ base: 'column', md: 'row' }}>
        <Stack width="full" gap={{ base: '10', md: '12' }}>
          <Heading textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
            Composable API design for a delightful experience
          </Heading>
          <Stack gap="10">
            {features.map(({ heading, description, icon }) => (
              <Stack key={heading} direction="row" gap={{ base: '5', md: '6' }}>
                <Flex
                  align="center"
                  background="bg.surface"
                  borderRadius="lg"
                  borderWidth="1px"
                  color="accent.muted"
                  fontSize="2xl"
                  justify="center"
                  shrink={0}
                  height={{ base: '10', md: '12' }}
                  width={{ base: '10', md: '12' }}
                >
                  {icon}
                </Flex>
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

        <Tabs className={tabs({ variant: 'fill' })} defaultValue="React">
          <TabList className={css({ borderBottomRadius: '0' })}>
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
      </Stack>
    </Container>
  )
}
