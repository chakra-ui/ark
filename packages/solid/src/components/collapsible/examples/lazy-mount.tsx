import { Collapsible } from '@ark-ui/solid/collapsible'

export const LazyMount = () => (
  <Collapsible.Root lazyMount>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
