import { Box, Container, Flex, Stack } from '@/panda/jsx'
import { FiArrowRight } from 'react-icons/fi'
import { RiDiscordFill, RiGithubFill, RiTwitterFill } from 'react-icons/ri'
import { Button } from '../shared/Button'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const Community = () => {
  const channels = [
    {
      name: 'Discord',
      description: 'To get involved in the community, ask questions.',
      icon: <RiDiscordFill />,
      callToAction: 'Join us',
      href: 'https://discord.gg/ark', // TODO update this
    },
    {
      name: 'Twitter',
      description: 'Follow now for announcements and new features.',
      icon: <RiTwitterFill />,
      callToAction: 'Follow us',
      href: 'https://twitter.com/ark_ui', // TODO update this
    },
    {
      name: 'GitHub',
      description: 'To file issues, feature requests, and contribute.',
      icon: <RiGithubFill />,
      callToAction: 'Contribute',
      href: 'https://github.com/chakra-ui/ark',
    },
  ]
  return (
    <Container py={{ base: '12', md: '24' }}>
      <Stack gap={{ base: '12', md: '16' }} align="center">
        <Stack gap={{ base: '4', md: '5' }} align="center" textAlign="center">
          <Heading textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
            Join our awesome community
          </Heading>
          <Text color="fg.muted" textStyle={{ base: 'md', md: 'lg' }}>
            Ark UI is an open-source library that allows developers to build components faster
          </Text>
        </Stack>
        <Stack gap="8" direction={{ base: 'column', md: 'row' }} width="full">
          {channels.map((channel, id) => (
            <Flex
              key={id}
              background="bg.surface"
              borderRadius="lg"
              borderWidth="1px"
              p={{ base: '5', md: '6' }}
              width="full"
              alignSelf="stretch"
            >
              <Stack gap={{ base: '8', md: '12' }} justify="space-between">
                <Box fontSize="4xl">{channel.icon}</Box>
                <Stack gap={{ base: '4', md: '5' }}>
                  <Stack gap={{ base: '1', md: '2' }}>
                    <Heading textStyle="lg" fontWeight="semibold">
                      {channel.name}
                    </Heading>
                    <Text textStyle="md" color="fg.muted">
                      {channel.description}
                    </Text>
                  </Stack>
                  <Button
                    variant="link"
                    href={channel.href}
                    size="lg"
                    color="orange.400"
                    rightIcon={<FiArrowRight />}
                  >
                    {channel.callToAction}
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}
