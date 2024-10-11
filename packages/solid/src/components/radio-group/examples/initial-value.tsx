import { RadioGroup } from '@ark-ui/solid/radio-group'
import { Index } from 'solid-js'

export const InitialValue = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root value="Solid">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <Index each={frameworks}>
        {(framework) => (
          <RadioGroup.Item value={framework()}>
            <RadioGroup.ItemText>{framework()}</RadioGroup.ItemText>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        )}
      </Index>
    </RadioGroup.Root>
  )
}
