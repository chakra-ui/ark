import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { For, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

const initialItems = ['React', 'Solid', 'Vue', 'Svelte']

export const Controlled = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const [value, setValue] = createSignal<string[]>([])

  return (
    <>
      <Combobox.Root
        collection={collection()}
        value={value()}
        onValueChange={(details) => setValue(details.value)}
        onInputValueChange={handleInputChange}
      >
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger>Open</Combobox.Trigger>
          <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.List>
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
              </Combobox.List>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
      <p>Value: {value().join(', ')}</p>
    </>
  )
}
