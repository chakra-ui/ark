import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

const items = ['React', 'Solid', 'Vue', 'Svelte']

export const MaxSelected = () => {
  const [value, setValue] = useState<string[]>([])
  const maxSelected = 2

  const hasReachedMax = (value: string[]) => value.length >= maxSelected

  const collection = createListCollection({
    items: items.map((item) => ({
      label: item,
      value: item,
      disabled: hasReachedMax(value) && !value.includes(item),
    })),
  })

  const handleValueChange = (details: Select.ValueChangeDetails) => {
    if (hasReachedMax(value) && details.value.length) return
    setValue(details.value)
  }

  return (
    <Select.Root collection={collection} multiple value={value} onValueChange={handleValueChange}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>
            <ChevronDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
              {collection.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}
