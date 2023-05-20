import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Radio } from './radio'
import { RadioControl } from './radio-control'
import { RadioGroup } from './radio-group'
import { RadioGroupLabel } from './radio-group-label'
import { RadioInput } from './radio-input'
import { RadioLabel } from './radio-label'

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
    <RadioGroup onChange={({ value }) => setValue(value)}>
      <RadioGroupLabel>Fruits: {value}</RadioGroupLabel>
      {options.map((option, id) => (
        <Radio
          key={id}
          value={option.id}
          style={{ fontWeight: option.id === value ? 'bold' : 'inherit' }}
        >
          <RadioLabel>{option.label}</RadioLabel>
          <RadioInput />
          <RadioControl />
        </Radio>
      ))}
    </RadioGroup>
  )
}

export const Disabled = () => {
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup onChange={({ value }) => setValue(value)}>
      <RadioGroupLabel asChild>Fruits: {value}</RadioGroupLabel>
      {options.map((option, id) => (
        <Radio
          key={id}
          value={option.id}
          disabled={option.id === 'mango'}
          style={{
            color: option.id === 'mango' ? 'lightgray' : 'inherit',
            fontWeight: option.id === value ? 'bold' : 'inherit',
          }}
        >
          <RadioLabel>{option.label}</RadioLabel>
          <RadioInput />
          <RadioControl />
        </Radio>
      ))}
    </RadioGroup>
  )
}
