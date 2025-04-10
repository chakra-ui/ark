import { RadioGroup, useRadioGroup } from '@ark-ui/react/radio-group'

export const RootProvider = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  const radioGroup = useRadioGroup()

  return (
    <>
      <button onClick={() => radioGroup.focus()}>Focus</button>

      <RadioGroup.RootProvider value={radioGroup}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        <RadioGroup.Indicator />
        {frameworks.map((framework) => (
          <RadioGroup.Item key={framework} value={framework}>
            <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup.RootProvider>
    </>
  )
}
