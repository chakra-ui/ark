import { Box, Container, Stack } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Button, Heading, Text } from '~/components/ui'
import { AvatarGroup } from '../ui/avatar-group'

const contributors = [
  {
    name: 'Christian Schröter',
    src: 'https://avatars.githubusercontent.com/u/1846056?v=4',
  },
  {
    name: 'Tim Kolberger',
    src: 'https://avatars.githubusercontent.com/u/16899513?v=4',
  },
  {
    name: 'Tyler Pfledderer',
    src: 'https://avatars.githubusercontent.com/u/65234762?v=4',
  },
  {
    name: 'Segun Adebayo',
    src: 'https://avatars.githubusercontent.com/u/6916170?v=4',
  },
  {
    name: 'Abraham',
    src: 'https://avatars.githubusercontent.com/u/30869823?v=4',
  },
  {
    name: 'Jonathan Bakebwa',
    src: 'https://avatars.githubusercontent.com/u/21237954?v=4',
  },
  {
    name: 'Zakaria Sahmane',
    src: 'https://avatars.githubusercontent.com/u/10008963?v=4',
  },
  {
    name: 'Esther Adebayo',
    src: 'https://avatars.githubusercontent.com/u/53586167?v=4',
  },
]

export const Community = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Box
        bg="bg.default"
        borderRadius="l3"
        px={{ base: '6', md: '16' }}
        py={{ base: '10', md: '16' }}
        borderWidth="1px"
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          gap={{ base: '8', md: '12' }}
        >
          <Stack gap="8">
            <Stack gap="5" maxW="2xl">
              <Heading as="h2" textStyle="3xl" fontWeight="semibold">
                Join the Ark UI Community
              </Heading>
              <Text textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted">
                For insights, support, and updates, connect on Discord. For real-time news, follow
                us on Twitter.
              </Text>
            </Stack>
            <AvatarGroup avatars={contributors} />
          </Stack>
          <Stack
            gap="3"
            flexShrink={0}
            direction={{ base: 'column-reverse', lg: 'row' }}
            justify="start"
          >
            <Button size={{ base: 'lg', md: 'xl' }} variant="outline" asChild>
              <a
                className={button({ size: { base: 'lg', md: 'xl' }, variant: 'outline' })}
                href="https://twitter.com/ark_ui_"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow on Twitter
              </a>
            </Button>
            <Button size={{ base: 'lg', md: 'xl' }} asChild>
              <a href="https://discord.gg/ww6HE5xaZ2" target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}
