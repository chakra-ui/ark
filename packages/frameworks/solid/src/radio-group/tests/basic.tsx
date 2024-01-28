import { For } from 'solid-js'
import { RadioGroup, type RadioGroupRootProps } from '../'

export const ComponentUnderTest = (props: RadioGroupRootProps) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <RadioGroup.Root {...props}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Indicator />
      <For each={items}>
        {(item) => (
          <RadioGroup.Item value={item.value} disabled={item.disabled}>
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
            <RadioGroup.ItemControl />
          </RadioGroup.Item>
        )}
      </For>
    </RadioGroup.Root>
  )
}
