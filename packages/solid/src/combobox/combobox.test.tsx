import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For, Portal } from 'solid-js/web'
import { vi } from 'vitest'
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
  type ComboboxOptionProps,
  type ComboboxProps,
} from '.'

const ComponentUnderTest = (props: Omit<ComboboxProps, 'children'>) => {
  const options: Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[] = [
    { label: 'ReactJS', value: 'react' },
    { label: 'SolidJS', value: 'solid' },
    { label: 'VueJS', value: 'vue', disabled: true },
    { label: 'AngularJS', value: 'angular' },
  ]

  return (
    <Combobox {...props}>
      <ComboboxLabel>JS Frameworks</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger data-testid="trigger-btn">▼</ComboboxTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            <For each={options}>
              {(option) => (
                <ComboboxOption
                  label={option.label}
                  value={option.value}
                  disabled={option?.disabled}
                >
                  {option.label}
                </ComboboxOption>
              )}
            </For>
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
  )
}

describe('Combobox', () => {
  it('should render', () => {
    render(() => <ComponentUnderTest />)
  })

  it('should show options on click', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible()

    await user.click(screen.getByTestId('trigger-btn'))
    expect(screen.getByRole('option', { name: 'ReactJS' })).toBeVisible()
  })

  it('should show a disabled option', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible()

    await user.click(screen.getByTestId('trigger-btn'))
    expect(screen.getByRole('option', { name: 'VueJS' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('should call onInputChange when value changes', async () => {
    const onInputChange = vi.fn()

    render(() => <ComponentUnderTest onInputChange={onInputChange} />)

    const TEST_VAL = 'react'

    const inputField = screen.getByRole('combobox')
    await user.type(inputField, TEST_VAL)
    expect(inputField).toHaveValue(TEST_VAL)
    expect(onInputChange).toBeCalledWith({ value: TEST_VAL })
    expect(onInputChange).toBeCalledTimes(TEST_VAL.length)
  })
})
