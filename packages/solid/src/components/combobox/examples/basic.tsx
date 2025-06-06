import { Combobox, createListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { For, createMemo, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

const initialItems = ['React', 'Solid', 'Vue']

export const Basic = () => {
  const [items, setItems] = createSignal(initialItems)

  const collection = createMemo(() => createListCollection({ items: items() }))

  const filter = useFilter({ sensitivity: 'base' })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(initialItems.filter((item) => filter().contains(item, details.inputValue)))
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
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
              <For each={collection().items}>
                {(item) => (
                  <Combobox.Item item={item}>
                    <Combobox.ItemText>{item}</Combobox.ItemText>
                    <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                  </Combobox.Item>
                )}
              </For>
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
