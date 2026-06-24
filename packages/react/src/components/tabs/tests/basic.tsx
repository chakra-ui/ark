import { Tabs } from '@ark-ui/react/tabs'

export const ComponentUnderTest = (props: Tabs.RootProps) => {
  const items = [{ value: 'React' }, { value: 'Solid' }, { value: 'Svelte', disabled: true }, { value: 'Vue' }]
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
