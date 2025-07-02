import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { For, type ParentProps, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

export const Multiple = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const [selectedValue, setSelectedValue] = createSignal<string[]>([])

  const { collection, filter } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte'],
    filter: (itemString, filterText) =>
      filterFn().contains(itemString, filterText) && !selectedValue().includes(itemString),
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setSelectedValue(details.value)
    filter()
  }

  return (
    <Combobox.Root
      collection={collection()}
      onInputValueChange={handleInputChange}
      onValueChange={handleValueChange}
      multiple
    >
      <Combobox.Label>Frameworks</Combobox.Label>
      <Combobox.Control>
        <ComboboxTagGroup>
          <For each={selectedValue()}>{(value) => <ComboboxTag>{value}</ComboboxTag>}</For>
        </ComboboxTagGroup>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item item={item}>
                  <Combobox.ItemText>{item}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const ComboboxTag = (props: ParentProps) => {
  return <pre style={{ display: 'inline-block', padding: '0.25rem', border: '1px solid gray' }} {...props} />
}

const ComboboxTagGroup = (props: ParentProps) => {
  return <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '0.5rem' }} {...props} />
}
