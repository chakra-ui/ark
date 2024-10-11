import { Select, createListCollection } from '@ark-ui/react/select'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'

const itemsBase = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

export const ReactiveCollection = () => {
  const [number, setNumber] = useState(0)
  const collection = createListCollection({
    items: itemsBase.map((item) => ({ ...item, label: `${item.label}-${number}` })),
  })

  return (
    <div>
      <button type="button" onClick={() => setNumber(number + 1)}>
        Inc
      </button>
      <button type="button" onClick={() => setNumber(number - 1)}>
        Dec
      </button>

      <Select.Root positioning={{ sameWidth: true }} collection={collection}>
        <Select.Label>Framework</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
            <ChevronsUpDownIcon />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>Framework</Select.ItemGroupLabel>
              {collection.items.map((item) => (
                <Select.Item item={item} key={item.label}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </div>
  )
}
