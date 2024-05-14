import { RadioGroup } from '../..'

export const InitialValue = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root defaultValue="Solid">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework}>
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemControl />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
