import { Combobox, createListCollection } from '@ark-ui/solid/combobox'
import { Field } from '@ark-ui/solid/field'
import { useFilter } from '@ark-ui/solid/locale'
import { For, createMemo, createSignal } from 'solid-js'

const initialItems = ['React', 'Solid', 'Vue']

export const WithField = (props: Field.RootProps) => {
  const [items, setItems] = createSignal(initialItems)

  const collection = createMemo(() => createListCollection({ items: items() }))

  const filter = useFilter({ sensitivity: 'base' })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(initialItems.filter((item) => filter().contains(item, details.inputValue)))
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
