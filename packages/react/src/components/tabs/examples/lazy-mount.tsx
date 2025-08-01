import { Tabs } from '@ark-ui/react/tabs'

export const LazyMount = () => (
  <Tabs.Root lazyMount unmountOnExit>
    <Tabs.List>
      <Tabs.Trigger value="react">React</Tabs.Trigger>
      <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
      <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
      <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Content value="react">React Content</Tabs.Content>
    <Tabs.Content value="vue">Vue Content</Tabs.Content>
    <Tabs.Content value="solid">Solid Content</Tabs.Content>
    <Tabs.Content value="svelte">Svelte Content</Tabs.Content>
  </Tabs.Root>
)
