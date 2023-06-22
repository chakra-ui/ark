import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Segmented } from './segmented'
import { SegmentedControl } from './segmented-control'
import { SegmentedGroup, type SegmentedGroupProps } from './segmented-group'
import { SegmentedGroupLabel } from './segmented-group-label'
import { SegmentedInput } from './segmented-input'
import { SegmentedLabel } from './segmented-label'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes', disabled: true },
  { id: 'grape', label: 'Grapes' },
]

const Component = (props: SegmentedGroupProps) => (
  <SegmentedGroup {...props}>
    <SegmentedGroupLabel>Fruits</SegmentedGroupLabel>
    {options.map((option, id) => (
      <Segmented key={id} value={option.id} disabled={option.disabled}>
        <SegmentedLabel>{option.label}</SegmentedLabel>
        <SegmentedInput />
        <SegmentedControl />
      </Segmented>
    ))}
  </SegmentedGroup>
)

describe('Segmented Group', () => {
  it('should invoke onChange if another value has selected', async () => {
    const onChange = vi.fn()

    render(<Component onChange={onChange} />)

    await user.click(screen.getByLabelText('Grapes'))
    expect(onChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should not invoke onChange if option is disabled', async () => {
    const onChange = vi.fn()

    render(<Component onChange={onChange} />)

    await user.click(screen.getByLabelText('Mangoes'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
