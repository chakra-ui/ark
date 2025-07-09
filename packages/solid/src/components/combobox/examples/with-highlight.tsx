import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { Highlight } from '@ark-ui/solid/highlight'
import { useFilter } from '@ark-ui/solid/locale'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'

const initialItems = ['React', 'Solid', 'Vue', 'Svelte']

export const WithHighlight = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
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
                    <Combobox.ItemText>
                      <Combobox.Context>
                        {(context) => <Highlight text={item} query={context().inputValue} ignoreCase />}
                      </Combobox.Context>
                    </Combobox.ItemText>
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
