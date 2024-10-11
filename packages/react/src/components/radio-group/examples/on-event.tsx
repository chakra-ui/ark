import { RadioGroup } from '@ark-ui/react/radio-group'

export const OnEvent = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root onValueChange={(details) => console.log(details.value)}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework}>
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
