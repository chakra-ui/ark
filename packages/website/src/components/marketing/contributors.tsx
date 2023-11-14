import { HStack } from 'styled-system/jsx'
import { Avatar } from '~/components/ui/avatar'

type Props = {
  contributors: { name: string; avatar: string }[]
}

export const Contributors = (props: Props) => {
  const { contributors } = props
  return (
    <HStack gap="0">
      {contributors.map((contributor, id) => (
        <Avatar.Root
          key={id}
          _first={{ marginStart: '0' }}
          marginStart={{ base: '-3', md: '-4' }}
          width={{ base: '12', md: '14' }}
          height={{ base: '12', md: '14' }}
          borderWidth="2px"
          borderColor="border.emphasized"
        >
          <Avatar.Fallback>...</Avatar.Fallback>
          <Avatar.Image src={contributor.avatar} alt={contributor.name} />
        </Avatar.Root>
      ))}
    </HStack>
  )
}
