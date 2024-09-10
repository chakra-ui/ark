import { Highlight } from '@ark-ui/react'

export const IgnoreCase = () => (
  <Highlight
    text="The quick brown Fox jumps over the lazy Dog."
    query={['fox', 'dog']}
    ignoreCase
  />
)
