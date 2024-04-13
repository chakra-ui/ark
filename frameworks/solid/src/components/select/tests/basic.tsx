import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Optional } from '~/types'
import { Select, type SelectRootProps } from '../'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

export const ComponentUnderTest = (props: Optional<SelectRootProps<Item>, 'items'>) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select.Root items={items} {...props}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>▼</Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner data-testid="positioner">
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel for="framework">Frameworks</Select.ItemGroupLabel>
              <For each={items}>
                {(item) => (
                  <Select.Item item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </For>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
