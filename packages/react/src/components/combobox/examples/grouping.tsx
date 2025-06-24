import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'

export const Grouping = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: contains,
    groupBy: (item) => item.type,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
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
  { label: 'Svelte', value: 'svelte', type: 'JS' },
  { label: 'Panda', value: 'panda', type: 'CSS' },
  { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
]
