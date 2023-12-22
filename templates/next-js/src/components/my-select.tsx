'use client'
import { Select } from '@ark-ui/react/src/select'

export const MySelect = () => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Select.Root items={items}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>Indicator</Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup id="framework">
            <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
            {items.map((item) => (
              <Select.Item key={item} item={item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}
