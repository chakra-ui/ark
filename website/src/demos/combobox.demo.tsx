'use client'
import { useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Combobox } from '~/components/ui/combobox'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'

export const Demo = (props: Omit<Combobox.RootProps, 'collection'>) => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter, reset } = useListCollection({
    initialItems: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte', disabled: true },
    ],
    filter: contains,
  })

  const handleInputChange = ({ inputValue }: Combobox.InputValueChangeDetails) => {
    filter(inputValue)
  }

  const handleOpenChange = () => {
    reset()
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
