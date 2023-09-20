import { radioGroupAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For } from 'solid-js'
import { vi } from 'vitest'
import { getParts } from '../setup-test'
import { RadioGroup, type RadioGroupProps } from './'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes', disabled: true },
  { id: 'grape', label: 'Grapes' },
]

const ComponentUnderTest = (props: RadioGroupProps) => (
  <RadioGroup.Root {...props}>
    <RadioGroup.Label>Fruits</RadioGroup.Label>
    <RadioGroup.Indicator />
    <For each={options}>
      {(option) => (
        <RadioGroup.Item value={option.id} disabled={option.disabled}>
          <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
          <RadioGroup.ItemControl />
        </RadioGroup.Item>
      )}
    </For>
  </RadioGroup.Root>
)

describe('Radio Group', () => {
  it.each(getParts(radioGroupAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
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
