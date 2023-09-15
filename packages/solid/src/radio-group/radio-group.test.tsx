import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For } from 'solid-js'
import { vi } from 'vitest'
import {
  Radio,
  RadioControl,
  RadioGroup,
  RadioGroupLabel,
  RadioLabel,
  type RadioGroupProps,
} from './'

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

  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByLabelText('Grapes'))
    expect(onValueChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should not invoke onValueChange if option is disabled', async () => {
    const onValueChange = vi.fn()

    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByLabelText('Mangoes'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
