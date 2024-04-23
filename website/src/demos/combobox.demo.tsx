import type { ComboboxValueChangeDetails } from '@ark-ui/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Combobox, IconButton, Input } from '~/components/ui'

const data = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

export const Demo = (props: Omit<Combobox.RootProps, 'items'>) => {
  const [items, setItems] = useState(data)

  const handleChange = (e: ComboboxValueChangeDetails) => {
    const filtered = data.filter((item) => e.value.includes(item.value))
    setItems(filtered.length > 0 ? filtered : data)
  }

  return (
    <Combobox.Root width="2xs" onValueChange={handleChange} {...props} items={items}>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Select a Framework" asChild>
          <Input />
        </Combobox.Input>
        <Combobox.Trigger asChild>
          <IconButton variant="link" aria-label="open" size="xs">
            <ChevronsUpDownIcon />
          </IconButton>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
            {items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
}
