import { Select, createListCollection } from '@ark-ui/solid/select'
import { For } from 'solid-js'

const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

export const SelectWithHiddenInput = (props: Partial<Select.RootProps<string>>) => (
  <form data-testid="form">
    <Select.Root collection={collection} name="framework" {...props}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <For each={collection.items}>
            {(item) => (
              <Select.Item item={item}>
                <Select.ItemText>{item}</Select.ItemText>
              </Select.Item>
            )}
          </For>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenInput />
    </Select.Root>
  </form>
)
