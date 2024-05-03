import { createSignal } from 'solid-js'
import { Index, Portal } from 'solid-js/web'
import { Select } from '../../'

export const DynamicItems = () => {
  const [items, setItems] = createSignal(['React', 'Solid', 'Vue'])
  const addItem = () => setItems([...items(), 'Svelte'])

  return (
    <div>
      <Select.Root id="sample-select" items={items()} present={undefined}>
        <Select.Control>
          <Select.Label>Framework</Select.Label>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
            <Select.Indicator>▼</Select.Indicator>
          </Select.Trigger>
          <Select.ClearTrigger>Clear</Select.ClearTrigger>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup id="framework">
                <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                <Index each={items()}>
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
      </Select.Root>

      <button type="button" onClick={addItem}>
        Add Item
      </button>
    </div>
  )
}
