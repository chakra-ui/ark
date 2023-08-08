import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup } from './'

type RadioGroupType = typeof RadioGroup

const meta: Meta<RadioGroupType> = {
  title: 'RadioGroup',
  component: RadioGroup,
}

export default meta

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes' },
  { id: 'grape', label: 'Grapes' },
]

export const Basic = () => {
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup.Root onChange={({ value }) => setValue(value)}>
      <RadioGroup.Label>Fruits: {value}</RadioGroup.Label>
      {options.map((option, id) => (
        <RadioGroup.Radio
          key={id}
          value={option.id}
          style={{ fontWeight: option.id === value ? 'bold' : 'inherit' }}
        >
          <RadioGroup.RadioLabel>{option.label}</RadioGroup.RadioLabel>
          <RadioGroup.RadioInput />
          <RadioGroup.RadioControl />
        </RadioGroup.Radio>
      ))}
    </RadioGroup.Root>
  )
}

export const Disabled = () => {
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup.Root onChange={({ value }) => setValue(value)}>
      <RadioGroup.Label asChild>Fruits: {value}</RadioGroup.Label>
      {options.map((option, id) => (
        <RadioGroup.Radio
          key={id}
          value={option.id}
          disabled={option.id === 'mango'}
          style={{
            color: option.id === 'mango' ? 'lightgray' : 'inherit',
            fontWeight: option.id === value ? 'bold' : 'inherit',
          }}
        >
          <RadioGroup.RadioLabel>{option.label}</RadioGroup.RadioLabel>
          <RadioGroup.RadioInput />
          <RadioGroup.RadioControl />
        </RadioGroup.Radio>
      ))}
    </RadioGroup.Root>
  )
}
