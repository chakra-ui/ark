import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { For, Portal } from 'solid-js/web'

const initialItems = ['React', 'Solid', 'Vue', 'Svelte']

export const RenderFn = () => {
  const filters = useFilter({ sensitivity: 'base' })

  const { collection: filteredCollection, filter } = useListCollection({
    initialItems,
    filter: filters().contains,
  })

  const handleInputChange = (details: { inputValue: string }) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root collection={filteredCollection()} onInputValueChange={handleInputChange}>
      <Combobox.Context>{(combobox) => <p>Value: {JSON.stringify(combobox().value)}</p>}</Combobox.Context>
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
              <For each={filteredCollection().items}>
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
