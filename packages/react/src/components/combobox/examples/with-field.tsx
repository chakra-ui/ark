import { Combobox, createListCollection } from '@ark-ui/react/combobox'
import { Field } from '@ark-ui/react/field'
import { useFilter } from '@ark-ui/react/locale'
import { useMemo, useState } from 'react'

export const WithField = (props: Field.RootProps) => {
  const [items, setItems] = useState(initialItems)

  const { contains } = useFilter({ sensitivity: 'base' })

  const collection = useMemo(() => createListCollection({ items }), [items])

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(initialItems.filter((item) => contains(item, details.inputValue)))
  }

  return (
    <Field.Root {...props}>
      <Combobox.Root collection={collection} onInputValueChange={handleInputChange}>
        <Combobox.Label>Label</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger>Open</Combobox.Trigger>
          <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
        </Combobox.Control>
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
      </Combobox.Root>
      <Field.HelperText>Additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}

const initialItems = ['React', 'Solid', 'Vue']
