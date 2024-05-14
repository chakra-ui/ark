import { Collapsible } from '../..'

export const LazyMountAndUnmountOnExit = () => (
  <Collapsible.Root lazyMount unmountOnExit>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
