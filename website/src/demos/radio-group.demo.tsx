import { RadioGroup } from '~/components/ui'

export const Demo = (props: RadioGroup.RootProps) => {
  const options = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'svelte', label: 'Svelte', disabled: true },
    { id: 'vue', label: 'Vue' },
  ]
  return (
    <RadioGroup.Root defaultValue="react" orientation="vertical" {...props}>
      {options.map((option) => (
        <RadioGroup.Item key={option.id} value={option.id} disabled={Boolean(option.disabled)}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
