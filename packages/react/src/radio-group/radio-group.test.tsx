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
