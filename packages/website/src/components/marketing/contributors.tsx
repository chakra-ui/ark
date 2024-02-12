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
        <Avatar
          src={contributor.avatar}
          name={contributor.name}
          key={id}
          _first={{ marginStart: '0' }}
          marginStart={{ base: '-3', md: '-4' }}
          size="xl"
          borderWidth="2px"
          borderColor="border.emphasized"
        />
      ))}
    </HStack>
  )
}
