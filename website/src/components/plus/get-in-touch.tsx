import { Stack } from 'styled-system/jsx'
import { AvatarGroup } from '~/components/ui/avatar-group'
import { Text } from '~/components/ui/text'
import { MailToSupportButton } from './mail-to-support'

export const GetInTouch = () => {
  return (
    <Stack
      gap={{ base: '6', lg: '8' }}
      px={{ base: '5', lg: '8' }}
      py="8"
      justify="center"
      align="center"
      borderRadius="2xl"
      bg="bg.subtle"
      borderWidth="1px"
      width="full"
    >
      <AvatarGroup
        avatars={[
          { name: 'Segun Adebayo', src: 'https://avatars2.githubusercontent.com/u/6916170' },
          {
            name: 'Christian Schröter',
            src: 'https://avatars3.githubusercontent.com/u/1846056',
          },
        ]}
      />

      <Stack textAlign="center">
        <Text textStyle={{ base: 'lg', md: 'xl' }} fontWeight="semibold">
          Still have questions?
        </Text>
        <Text textStyle="lg" color="fg.muted">
          Can't find the answer you're looking for? Our team is happy to answer your questions.
        </Text>
      </Stack>

      <MailToSupportButton subject="Question about Ark Plus" size="xl" alignSelf="center">
        Send us an email
      </MailToSupportButton>
    </Stack>
  )
}
