import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For } from 'solid-js'
import { vi } from 'vitest'
import {
  Radio,
  RadioControl,
  RadioGroup,
  RadioGroupLabel,
  RadioInput,
  RadioLabel,
  type RadioGroupProps,
} from '.'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes', disabled: true },
  { id: 'grape', label: 'Grapes' },
]

const ComponentUnderTest = (props: RadioGroupProps) => (
  <RadioGroup {...props}>
    <RadioGroupLabel>Fruits</RadioGroupLabel>
    <For each={options}>
      {(option) => (
        <Radio value={option.id} disabled={option.disabled}>
          <RadioLabel>{option.label}</RadioLabel>
          <RadioInput />
          <RadioControl />
        </Radio>
      )}
    </For>
  </RadioGroup>
)

describe('Radio Group', () => {
  it('should render', () => {
    render(() => <ComponentUnderTest />)
  })

  it('should invoke onChange if another value has selected', async () => {
    const onChange = vi.fn()
    render(() => <ComponentUnderTest onChange={onChange} />)

    await user.click(screen.getByLabelText('Grapes'))
    expect(onChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should not invoke onChange if option is disabled', async () => {
    const onChange = vi.fn()

    render(() => <ComponentUnderTest onChange={onChange} />)

    await user.click(screen.getByLabelText('Mangoes'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
