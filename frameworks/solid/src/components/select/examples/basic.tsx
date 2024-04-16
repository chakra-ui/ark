import { Index, Portal } from 'solid-js/web'
import { Select } from '../..'

export const Basic = () => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Select.Root items={items}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
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
              <Select.ItemGroupLabel for="framework">Frameworks</Select.ItemGroupLabel>
              <Index each={items}>
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
  )
}
