import { RadioGroup, useRadioGroup } from '@ark-ui/solid/radio-group'
import { Index } from 'solid-js'

export const RootProvider = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  const radioGroup = useRadioGroup()

  return (
    <>
      <button onClick={() => radioGroup().focus()}>Focus</button>

      <RadioGroup.RootProvider value={radioGroup}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        <RadioGroup.Indicator />
        <Index each={frameworks}>
          {(framework) => (
            <RadioGroup.Item value={framework()}>
              <RadioGroup.ItemText>{framework()}</RadioGroup.ItemText>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          )}
        </Index>
      </RadioGroup.RootProvider>
    </>
  )
}
