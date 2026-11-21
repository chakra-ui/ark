import { Select, createListCollection } from '@ark-ui/react/select'

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
          {collection.items.map((item) => (
            <Select.Item key={item} item={item}>
              <Select.ItemText>{item}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenInput />
    </Select.Root>
  </form>
)
