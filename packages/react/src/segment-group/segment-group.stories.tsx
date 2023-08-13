import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Segment, SegmentControl, SegmentGroup, SegmentGroupIndicator, SegmentLabel } from './index'
import './segment-group.css'

type SegmentGroupType = typeof SegmentGroup

const meta: Meta<SegmentGroupType> = {
  title: 'SegmentGroup',
  component: SegmentGroup,
}

export default meta

const options = [
  { id: 'react', label: 'React' },
  { id: 'solid', label: 'Solid' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'vue', label: 'Vue' },
]

export const Basic = () => (
  <SegmentGroup>
    <SegmentGroupIndicator />
    {options.map((option, id) => (
      <Segment key={id} value={option.id}>
        <SegmentLabel>{option.label}</SegmentLabel>
        <SegmentControl />
      </Segment>
    ))}
  </SegmentGroup>
)

export const InitialValue = () => (
  <SegmentGroup defaultValue="react">
    <SegmentGroupIndicator />
    {options.map((option, id) => (
      <Segment key={id} value={option.id}>
        <SegmentLabel>{option.label}</SegmentLabel>
        <SegmentControl />
      </Segment>
    ))}
  </SegmentGroup>
)

export const Controlled = () => {
  const [value, setValue] = useState('react')
  return (
    <SegmentGroup value={value} onChange={(e) => setValue(e.value)}>
      <SegmentGroupIndicator />
      {options.map((option, id) => (
        <Segment key={id} value={option.id}>
          <SegmentLabel>{option.label}</SegmentLabel>
          <SegmentControl />
        </Segment>
      ))}
    </SegmentGroup>
  )
}

export const Disabled = () => (
  <SegmentGroup defaultValue="react">
    <SegmentGroupIndicator />
    {options.map((option, id) => (
      <Segment key={id} value={option.id} disabled={option.id === 'svelte'}>
        <SegmentLabel>{option.label}</SegmentLabel>
        <SegmentControl />
      </Segment>
    ))}
  </SegmentGroup>
)
