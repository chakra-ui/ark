import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from '@atlas/react'
import { useState } from 'react'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes' },
  { id: 'grape', label: 'Grapes' },
]

export const basic = () => {
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup onChange={({ value }) => setValue(value)}>
      <RadioGroupLabel as="h3">Fruits: {value}</RadioGroupLabel>
      {options.map((option, id) => (
        <RadioGroupItem
          key={id}
          value={option.id}
          style={{ fontWeight: option.id === value ? 'bold' : 'inherit' }}
        >
          <RadioGroupItemLabel>{option.label}</RadioGroupItemLabel>
          <RadioGroupItemInput />
          <RadioGroupItemControl />
        </RadioGroupItem>
      ))}
    </RadioGroup>
  )
}

export const disabled = () => {
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup onChange={({ value }) => setValue(value)}>
      <RadioGroupLabel as="h3">Fruits: {value}</RadioGroupLabel>
      {options.map((option, id) => (
        <RadioGroupItem
          key={id}
          value={option.id}
          disabled={option.id === 'mango'}
          style={{
            color: option.id === 'mango' ? 'lightgray' : 'inherit',
            fontWeight: option.id === value ? 'bold' : 'inherit',
          }}
        >
          <RadioGroupItemLabel>{option.label}</RadioGroupItemLabel>
          <RadioGroupItemInput />
          <RadioGroupItemControl />
        </RadioGroupItem>
      ))}
    </RadioGroup>
  )
}
