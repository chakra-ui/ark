import { Combobox, createListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { For, createMemo, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

export const Grouping = () => {
  const [items, setItems] = createSignal(initialItems)

  const collection = createMemo(() =>
    createListCollection({
      items: items(),
      groupBy: (item) => item.type,
    }),
  )

  const filter = useFilter({ sensitivity: 'base' })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(initialItems.filter((item) => filter().contains(item.label, details.inputValue)))
  }
  return (
    <Combobox.Root collection={collection()} onInputValueChange={handleInputChange}>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <For each={collection().group()}>
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

const initialItems = [
  { label: 'React', value: 'react', type: 'JS' },
  { label: 'Solid', value: 'solid', type: 'JS' },
  { label: 'Vue', value: 'vue', type: 'JS' },
  { label: 'Panda', value: 'panda', type: 'CSS' },
  { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
]
