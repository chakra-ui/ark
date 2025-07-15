import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'

export const CustomObject = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { country: 'United States', code: 'US', flag: '🇺🇸' },
      { country: 'Canada', code: 'CA', flag: '🇨🇦' },
      { country: 'Australia', code: 'AU', flag: '🇦🇺' },
    ],
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root collection={collection()} onInputValueChange={handleInputChange}>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Countries</Combobox.ItemGroupLabel>
              <For each={collection().items}>
                {(item) => (
                  <Combobox.Item item={item}>
                    <Combobox.ItemText>{item.country}</Combobox.ItemText>
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
