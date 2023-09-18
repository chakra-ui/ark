import {
  Radio,
  RadioControl,
  RadioGroup,
  RadioLabel,
  type RadioGroupProps,
} from '~/components/ui/radio-group'

export const RadioGroupDemo = (props: RadioGroupProps) => {
  const options = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'vue', label: 'Vue' },
  ]
  return (
    <RadioGroup defaultValue="react" orientation="vertical" {...props}>
      {options.map((option, id) => (
        <Radio key={id} value={option.id}>
          <RadioControl />
          <RadioLabel>{option.label}</RadioLabel>
        </Radio>
      ))}
    </RadioGroup>
  )
}
