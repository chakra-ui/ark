import { Index } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { RadioGroup } from './'
import './radio-group.css'

const meta: Meta = {
  title: 'RadioGroup',
}

export default meta

export const Basic = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root>
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
