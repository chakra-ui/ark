import { Index } from 'solid-js/web'
import { Field } from '../../field'
import { Select, createListCollection } from '../'

export const SelectWithField = (props: Field.RootProps) => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  return (
    <Field.Root {...props}>
      <Select.Root collection={collection}>
        <Select.Label>Label</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
            <Select.Indicator>▼</Select.Indicator>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Index each={collection.items}>
              {(item) => (
                <Select.Item item={item()}>
                  <Select.ItemText>{item()}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              )}
            </Index>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>
      <Field.HelperText>Additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
