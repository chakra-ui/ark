import { RadioGroup } from '@ark-ui/solid/radio-group'
import { For } from 'solid-js'

export const ComponentUnderTest = (props: RadioGroup.RootProps) => {
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
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        )}
      </For>
    </RadioGroup.Root>
  )
}
