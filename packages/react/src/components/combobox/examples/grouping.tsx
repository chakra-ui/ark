import { Combobox, createListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { useMemo, useState } from 'react'

export const Grouping = () => {
  const [items, setItems] = useState(initialItems)

  const collection = useMemo(
    () =>
      createListCollection({
        items,
        groupBy: (item) => item.type,
      }),
    [items],
  )

  const { contains } = useFilter({ sensitivity: 'base' })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(initialItems.filter((item) => contains(item.label, details.inputValue)))
  }

  return (
    <Combobox.Root collection={collection} onInputValueChange={handleInputChange}>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {collection.group().map(([type, group]) => (
              <Combobox.ItemGroup key={type}>
                <Combobox.ItemGroupLabel>{type}</Combobox.ItemGroupLabel>
                {group.map((item) => (
                  <Combobox.Item key={item.value} item={item}>
                    <Combobox.ItemText>{item.label}</Combobox.ItemText>
                    <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.ItemGroup>
            ))}
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
