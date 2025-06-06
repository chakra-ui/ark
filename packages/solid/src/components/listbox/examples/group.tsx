import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { For } from 'solid-js'

export const Group = () => {
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
    <Listbox.Root collection={collection}>
      <Listbox.Label>Select your Frameworks</Listbox.Label>
      <Listbox.Content>
        <For each={collection.group()}>
          {([type, group]) => (
            <Listbox.ItemGroup>
              <Listbox.ItemGroupLabel>{type}</Listbox.ItemGroupLabel>
              <For each={group}>
                {(item) => (
                  <Listbox.Item item={item}>
                    <Listbox.ItemText>{item.label}</Listbox.ItemText>
                    <Listbox.ItemIndicator />
                  </Listbox.Item>
                )}
              </For>
            </Listbox.ItemGroup>
          )}
        </For>
      </Listbox.Content>
    </Listbox.Root>
  )
}
