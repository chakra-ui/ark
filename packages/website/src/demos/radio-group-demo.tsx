import { RadioGroup, type RadioGroupProps } from '~/components/ui/radio-group'

export const RadioGroupDemo = (props: RadioGroupProps) => {
  const options = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'vue', label: 'Vue' },
  ]
  return (
    <RadioGroup.Root defaultValue="react" orientation="vertical" {...props}>
      {options.map((option, id) => (
        <RadioGroup.Item key={id} value={option.id}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
