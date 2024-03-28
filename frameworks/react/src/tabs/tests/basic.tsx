import { Tabs, type TabsRootProps } from '../'

export const ComponentUnderTest = (props: TabsRootProps) => {
  const items = [
    { value: 'React' },
    { value: 'Solid' },
    { value: 'Svelte', disabled: true },
    { value: 'Vue' },
  ]
  return (
    <Tabs.Root {...props}>
      <Tabs.List>
        {items.map((item, id) => (
          <Tabs.Trigger key={id} value={item.value} disabled={item.disabled}>
            {item.value} Trigger
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {items.map((item, id) => (
        <Tabs.Content key={id} value={item.value}>
          {item.value} Content
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
