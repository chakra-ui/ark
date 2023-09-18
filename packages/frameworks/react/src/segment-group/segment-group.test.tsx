import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import {
  Segment,
  SegmentControl,
  SegmentGroup,
  SegmentGroupLabel,
  type SegmentGroupProps,
} from './'

import { SegmentLabel } from './segment-label'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes', disabled: true },
  { id: 'grape', label: 'Grapes' },
]

const Component = (props: SegmentGroupProps) => (
  <SegmentGroup {...props}>
    <SegmentGroupLabel>Fruits</SegmentGroupLabel>
    {options.map((option, id) => (
      <Segment key={id} value={option.id} disabled={option.disabled}>
        <SegmentLabel>{option.label}</SegmentLabel>
        <SegmentControl />
      </Segment>
    ))}
  </SegmentGroup>
)

describe('Segment Group', () => {
  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()

    render(<Component onValueChange={onValueChange} />)

    await user.click(screen.getByLabelText('Grapes'))
    expect(onValueChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should not invoke onValueChange if option is disabled', async () => {
    const onValueChange = vi.fn()

    render(<Component onValueChange={onValueChange} />)

    await user.click(screen.getByLabelText('Mangoes'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
