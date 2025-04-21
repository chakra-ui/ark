import { Combobox, createListCollection } from '@ark-ui/solid/combobox'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'

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
    <Combobox.Root collection={collection} multiple>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <For each={collection.group()}>
              {([type, group]) => (
                <Combobox.ItemGroup>
                  <Combobox.ItemGroupLabel>{type}</Combobox.ItemGroupLabel>
                  <For each={group}>
                    {(item) => (
                      <Combobox.Item item={item}>
                        <Combobox.ItemText>{item.label}</Combobox.ItemText>
                        <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                      </Combobox.Item>
                    )}
                  </For>
                </Combobox.ItemGroup>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
