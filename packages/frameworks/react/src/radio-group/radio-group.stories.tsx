import type { Meta } from '@storybook/react'
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
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework}>
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemControl />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
