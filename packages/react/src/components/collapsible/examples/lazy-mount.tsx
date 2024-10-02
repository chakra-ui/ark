import { Collapsible } from '@ark-ui/react/collapsible'

export const LazyMount = () => (
  <Collapsible.Root lazyMount>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
