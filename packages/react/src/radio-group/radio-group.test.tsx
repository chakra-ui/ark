import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import {
  Radio,
  RadioControl,
  RadioGroup,
  RadioGroupLabel,
  RadioLabel,
  type RadioGroupProps,
} from '.'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes', disabled: true },
  { id: 'grape', label: 'Grapes' },
]

const Component = (props: RadioGroupProps) => (
  <RadioGroup {...props}>
    <RadioGroupLabel>Fruits</RadioGroupLabel>
    {options.map((option, id) => (
      <Radio key={id} value={option.id} disabled={option.disabled}>
        <RadioLabel>{option.label}</RadioLabel>
        <RadioControl />
      </Radio>
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

  it('should not invoke onChange if option is disabled', async () => {
    const onChange = vi.fn()

    render(<Component onChange={onChange} />)

    await user.click(screen.getByLabelText('Mangoes'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
