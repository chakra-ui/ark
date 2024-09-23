'use client'
import { createListCollection } from '@ark-ui/react/combobox'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Combobox } from '~/components/ui/combobox'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'

const initialCollection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ],
})

export const Demo = (props: Omit<Combobox.RootProps, 'collection'>) => {
  const [collection, setCollection] = useState(initialCollection)

  const handleInputChange = ({ inputValue }: Combobox.InputValueChangeDetails) => {
    const filtered = initialCollection.items.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase()),
    )

    setCollection(
      filtered.length > 0 ? createListCollection({ items: filtered }) : initialCollection,
    )
  }

  const handleOpenChange = () => {
    setCollection(initialCollection)
  }

  return (
    <Combobox.Root
      width="2xs"
      onInputValueChange={handleInputChange}
      onOpenChange={handleOpenChange}
      collection={collection}
      {...props}
    >
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
            {collection.items.map((item) => (
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
