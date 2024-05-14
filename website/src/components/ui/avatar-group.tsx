import { HStack } from 'styled-system/jsx'
import { Avatar } from '~/components/ui/avatar'

interface Props {
  avatars: { name: string; src: string }[]
}

export const AvatarGroup = (props: Props) => {
  const { avatars } = props
  return (
    <HStack gap="0">
      {avatars.map((avatar) => (
        <Avatar
          key={avatar.name}
          src={avatar.src}
          name={avatar.name}
          _first={{ marginStart: '0' }}
          overflow="hidden"
          marginStart={{ base: '-3', md: '-4' }}
          size={{ base: 'xl', md: '2xl' }}
          borderWidth="2px"
          borderColor="border.emphasized"
        />
      ))}
    </HStack>
  )
}
