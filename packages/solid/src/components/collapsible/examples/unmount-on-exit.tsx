import { Collapsible } from '@ark-ui/solid/collapsible'

export const UnmountOnExit = () => (
  <Collapsible.Root unmountOnExit>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
