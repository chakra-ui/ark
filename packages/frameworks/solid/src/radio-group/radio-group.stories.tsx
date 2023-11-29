import { Index } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { RadioGroup } from './'
import './radio-group.css'

type RadioGroupType = typeof RadioGroup

const meta: Meta<RadioGroupType> = {
  title: 'RadioGroup',
  component: RadioGroup,
}

export default meta

export const Basic = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Indicator />
      <Index each={frameworks}>
        {(framework) => (
          <RadioGroup.Item value={framework()}>
            <RadioGroup.ItemText>{framework()}</RadioGroup.ItemText>
            <RadioGroup.ItemControl />
          </RadioGroup.Item>
        )}
      </Index>
    </RadioGroup.Root>
  )
}

export const Disabled = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root disabled>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <Index each={frameworks}>
        {(framework) => (
          <RadioGroup.Item value={framework()}>
            <RadioGroup.ItemText>{framework()}</RadioGroup.ItemText>
            <RadioGroup.ItemControl />
          </RadioGroup.Item>
        )}
      </Index>
    </RadioGroup.Root>
  )
}

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
          </RadioGroup.Item>
        )}
      </Index>
    </RadioGroup.Root>
  )
}

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
          </RadioGroup.Item>
        )}
      </Index>
    </RadioGroup.Root>
  )
}
