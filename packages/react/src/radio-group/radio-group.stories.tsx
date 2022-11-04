import { useState } from 'react'
import { RadioGroup } from './radio-group'
import { Radio } from './radio-group-item'
import { RadioControl } from './radio-group-item-control'
import { RadioInput } from './radio-group-item-input'
import { RadioLabel } from './radio-group-item-label'
import { RadioGroupLabel } from './radio-group-label'

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
      <RadioGroupLabel as="h3">Fruits: {value}</RadioGroupLabel>
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
      <RadioGroupLabel as="h3">Fruits: {value}</RadioGroupLabel>
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
