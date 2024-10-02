import { Collapsible } from '@ark-ui/react/collapsible'

export const OnExitComplete = () => (
  <Collapsible.Root onExitComplete={() => alert('on exit')}>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
