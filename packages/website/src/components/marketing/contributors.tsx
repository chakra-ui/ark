import { HStack } from '@ark-ui/styled-system/jsx'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type Props = {
  contributors: { name: string; avatar: string }[]
}

export const Contributors = (props: Props) => {
  const { contributors } = props
  return (
    <HStack gap="0">
      {contributors.map((contributor, id) => (
        <Avatar
          key={id}
          _first={{ marginStart: '0' }}
          marginStart={{ base: '-3', md: '-4' }}
          width={{ base: '12', md: '14' }}
          height={{ base: '12', md: '14' }}
          borderWidth="2px"
          borderColor="border.emphasized"
        >
          <AvatarFallback>...</AvatarFallback>
          <AvatarImage src={contributor.avatar} alt={contributor.name} />
        </Avatar>
      ))}
    </HStack>
  )
}
