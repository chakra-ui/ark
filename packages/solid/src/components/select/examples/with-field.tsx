import { Field } from '@ark-ui/solid/field'
import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronDownIcon } from 'lucide-solid'
import { Index } from 'solid-js/web'

export const WithField = (props: Field.RootProps) => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  return (
    <Field.Root {...props}>
      <Select.Root collection={collection}>
        <Select.Label>Label</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
            <Select.Indicator>
              <ChevronDownIcon />
            </Select.Indicator>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          ̦
          <Select.Content>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
              <Index each={collection.items}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item()}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>
      <Field.HelperText>Additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
