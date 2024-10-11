import { RadioGroup } from '@ark-ui/solid/radio-group'
import { Index } from 'solid-js'

export const OnEvent = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root onValueChange={(details) => console.log(details.value)}>
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
