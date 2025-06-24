import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { Field } from '@ark-ui/solid/field'
import { useFilter } from '@ark-ui/solid/locale'
import { For } from 'solid-js'

const initialItems = ['React', 'Solid', 'Vue', 'Svelte']

export const WithField = (props: Field.RootProps) => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Field.Root {...props}>
      <Combobox.Root collection={collection()} onInputValueChange={handleInputChange}>
        <Combobox.Label>Label</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger>Open</Combobox.Trigger>
          <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
        </Combobox.Control>
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
      </Combobox.Root>
      <Field.HelperText>Additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
