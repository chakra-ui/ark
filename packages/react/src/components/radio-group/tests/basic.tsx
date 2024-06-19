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
      {items.map((item) => (
        <RadioGroup.Item key={item.value} value={item.value} disabled={item.disabled}>
          <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
