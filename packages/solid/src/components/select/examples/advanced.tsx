import { Select, createListCollection } from '@ark-ui/solid/select'
import { For, Portal } from 'solid-js/web'

export const Advanced = () => {
  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react', type: 'JS' },
      { label: 'Solid', value: 'solid', type: 'JS' },
      { label: 'Vue', value: 'vue', type: 'JS' },
      { label: 'Panda', value: 'panda', type: 'CSS' },
      { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
    ],
    groupBy: (item) => item.type,
  })
  return (
    <Select.Root collection={collection}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <For each={collection.group()}>
              {([type, group]) => (
                <Select.ItemGroup>
                  <Select.ItemGroupLabel>{type}</Select.ItemGroupLabel>
                  <For each={group}>
                    {(item) => (
                      <Select.Item item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator>✓</Select.ItemIndicator>
                      </Select.Item>
                    )}
                  </For>
                </Select.ItemGroup>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}
