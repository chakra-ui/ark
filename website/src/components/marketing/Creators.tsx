import { ThanksIcon } from '@/icons/Thanks'
import { Container, Flex, HStack, Stack } from '@/panda/jsx'
import { Avatar } from '../shared/Avatar'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const Creators = () => {
  const creators = [
    {
      name: 'Segun Adebayo',
      avatar: 'https://avatars.githubusercontent.com/u/6916170?v=4',
    },
    {
      name: 'Esther Adebyo',
      avatar: 'https://avatars.githubusercontent.com/u/53586167?v=4',
    },
    {
      name: 'Jonathan Bakebwa',
      avatar: 'https://avatars.githubusercontent.com/u/21237954?v=4',
    },
    {
      name: 'Christian Schröter',
      avatar: 'https://avatars.githubusercontent.com/u/1846056?v=4',
    },
    {
      name: 'Tim Kolberger',
      avatar: 'https://avatars.githubusercontent.com/u/16899513?v=4',
    },

    {
      name: 'Tyler Pfledderer',
      avatar: 'https://avatars.githubusercontent.com/u/65234762?v=4',
    },
  ]
  return (
    <Container py={{ base: '12', md: '24' }}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        px={{ base: '6', md: '16' }}
        py={{ base: '10', md: '16' }}
        gap="16"
        background="bg.surface"
        borderWidth="1px"
        borderRadius="2xl"
        alignItems="center"
      >
        <Stack direction={{ base: 'column', md: 'row' }} gap="16" flex="1">
          <Stack gap="10">
            <Stack gap="4" maxW="lg">
              <Heading textStyle="3xl" fontWeight="semibold">
                Made by creators of <br /> Chakra UI and Zag.js
              </Heading>
              <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }}>
                The Chakra UI team developed Ark UI to give you total control of your web
                applications
              </Text>
            </Stack>
            <Stack gap={{ base: '4', md: '5' }}>
              <Heading
                color="accent.muted"
                textTransform="uppercase"
                textStyle="md"
                letterSpacing="0.12em"
              >
                People
              </Heading>
              <HStack gap="3" justifyContent="flex-end">
                {creators.map((creator) => (
                  <Avatar key={creator.name} name={creator.name} src={creator.avatar} size="xl" />
                ))}
              </HStack>
            </Stack>
          </Stack>
          <Flex justify="center" align="center" flex="1" alignSelf="stretch">
            <ThanksIcon width="224" />
          </Flex>
        </Stack>
      </Stack>
    </Container>
  )
}
