import { For } from 'solid-js'
import { Tabs } from '../'

export const ComponentUnderTest = (props: Tabs.RootProps) => {
  const items = [
    { value: 'React' },
    { value: 'Solid' },
    { value: 'Svelte', disabled: true },
    { value: 'Vue' },
  ]
  return (
    <Tabs.Root {...props}>
      <Tabs.List>
        <For each={items}>
          {(item) => (
            <Tabs.Trigger value={item.value} disabled={item.disabled}>
              {item.value} Trigger
            </Tabs.Trigger>
          )}
        </For>
        <Tabs.Indicator />
      </Tabs.List>
      <For each={items}>
        {(item) => <Tabs.Content value={item.value}>{item.value} Content</Tabs.Content>}
      </For>
    </Tabs.Root>
  )
}
