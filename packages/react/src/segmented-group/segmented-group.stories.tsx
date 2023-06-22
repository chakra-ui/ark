import type { Meta } from '@storybook/react'
import { useState } from 'react'
import {
  Segmented,
  SegmentedControl,
  SegmentedGroup,
  SegmentedGroupLabel,
  SegmentedInput,
  SegmentedLabel,
} from './index'

type SegmentedGroupType = typeof SegmentedGroup

const meta: Meta<SegmentedGroupType> = {
  title: 'SegmentedGroup',
  component: SegmentedGroup,
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
    <SegmentedGroup onChange={({ value }) => setValue(value)}>
      <SegmentedGroupLabel>Fruits: {value}</SegmentedGroupLabel>
      {options.map((option, id) => (
        <Segmented
          key={id}
          value={option.id}
          style={{ fontWeight: option.id === value ? 'bold' : 'inherit' }}
        >
          <SegmentedLabel>{option.label}</SegmentedLabel>
          <SegmentedInput />
          <SegmentedControl />
        </Segmented>
      ))}
    </SegmentedGroup>
  )
}

export const Disabled = () => {
  const [value, setValue] = useState('apple')
  return (
    <SegmentedGroup onChange={({ value }) => setValue(value)}>
      <SegmentedGroupLabel asChild>Fruits: {value}</SegmentedGroupLabel>
      {options.map((option, id) => (
        <Segmented
          key={id}
          value={option.id}
          disabled={option.id === 'mango'}
          style={{
            color: option.id === 'mango' ? 'lightgray' : 'inherit',
            fontWeight: option.id === value ? 'bold' : 'inherit',
          }}
        >
          <SegmentedLabel>{option.label}</SegmentedLabel>
          <SegmentedInput />
          <SegmentedControl />
        </Segmented>
      ))}
    </SegmentedGroup>
  )
}
