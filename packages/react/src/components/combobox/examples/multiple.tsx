import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { useRef } from 'react'

export const Multiple = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const selectedValue = useRef<string[]>([])

  const { collection, filter, remove } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte'],
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    selectedValue.current = details.value
    remove(...details.value)
  }

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={handleInputChange}
      onValueChange={handleValueChange}
      multiple
    >
      <Combobox.Label>Frameworks</Combobox.Label>
      <Combobox.Control>
        <ComboboxTagGroup>
          {selectedValue.current.map((value, index) => (
            <ComboboxTag key={index}>{value}</ComboboxTag>
          ))}
        </ComboboxTagGroup>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {collection.items.map((item) => (
              <Combobox.Item key={item} item={item}>
                <Combobox.ItemText>{item}</Combobox.ItemText>
                <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const ComboboxTag = (props: React.PropsWithChildren) => {
  return <pre style={{ display: 'inline-block', padding: '0.25rem', border: '1px solid gray' }} {...props} />
}

const ComboboxTagGroup = (props: React.PropsWithChildren) => {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} {...props} />
}
