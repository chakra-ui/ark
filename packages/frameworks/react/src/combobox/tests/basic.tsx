import { Combobox, type ComboboxProps } from '../'
import { Portal } from '../../portal'
import type { Optional } from '../../types'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

export const ComponentUnderTest = (props: Optional<ComboboxProps<Item>, 'items'>) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Combobox.Root items={items} {...props}>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input data-testid="input" />
        <Combobox.Trigger data-testid="trigger">Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner data-testid="positioner">
          <Combobox.Content>
            <Combobox.ItemGroup id="framework">
              <Combobox.ItemGroupLabel htmlFor="framework">Frameworks</Combobox.ItemGroupLabel>
              {items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
