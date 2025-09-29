import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronDownIcon } from 'lucide-solid'
import { Index, Portal } from 'solid-js/web'

export const Disabled = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  return (
    <Select.Root collection={collection} disabled>
      <Select.Label>Framework (Disabled)</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>
            <ChevronDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
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
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}
