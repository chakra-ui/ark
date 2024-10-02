import { Combobox, createListCollection } from '@ark-ui/solid/combobox'
import { Field } from '@ark-ui/solid/field'
import { For } from 'solid-js'

export const WithField = (props: Field.RootProps) => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  return (
    <Field.Root {...props}>
      <Combobox.Root collection={collection}>
        <Combobox.Label>Label</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger>Open</Combobox.Trigger>
          <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            <For each={collection.items}>
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
