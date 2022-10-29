import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import { vi } from 'vitest'
import { RadioGroup, RadioGroupProps } from './radio-group'
import { RadioGroupItem } from './radio-group-item'
import { RadioGroupItemControl } from './radio-group-item-control'
import { RadioGroupItemInput } from './radio-group-item-input'
import { RadioGroupItemLabel } from './radio-group-item-label'
import { RadioGroupLabel } from './radio-group-label'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes', disabled: true },
  { id: 'grape', label: 'Grapes' },
]

const Component = (props: RadioGroupProps) => (
  <RadioGroup {...props}>
    <RadioGroupLabel as="h3">Fruits</RadioGroupLabel>
    {options.map((option, id) => (
      <RadioGroupItem key={id} value={option.id} disabled={option.disabled}>
        <RadioGroupItemLabel>{option.label}</RadioGroupItemLabel>
        <RadioGroupItemInput />
        <RadioGroupItemControl />
      </RadioGroupItem>
    ))}
  </RadioGroup>
)

describe('Radio Group', () => {
  it('should invoke onChange if another value has selected', async () => {
    const onChange = vi.fn()

    render(<Component onChange={onChange} />)

    await user.click(screen.getByLabelText('Grapes'))
    expect(onChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should invoke onChange if another value has selected', async () => {
    const onChange = vi.fn()

    render(<Component onChange={onChange} />)

    await user.click(screen.getByLabelText('Mangoes'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
