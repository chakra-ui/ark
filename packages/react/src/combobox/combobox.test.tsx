import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Portal } from '..'
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
} from './'

const ComponentUnderTest = (props: ComboboxProps) => {
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
            {options.map((item, index) => (
              <ComboboxOption
                key={`${item.value}:${index}`}
                label={item.label}
                value={item.value}
                disabled={item?.disabled}
              >
                {item.label}
              </ComboboxOption>
            ))}
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
  )
}

describe('Combobox', () => {
  it('should render', () => {
    render(<ComponentUnderTest />)
  })

  it('should show options on click', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible()

    await user.click(screen.getByTestId('trigger-btn'))
    expect(screen.getByRole('option', { name: 'ReactJS' })).toBeVisible()
  })

  it('should show a disabled option', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible()

    await user.click(screen.getByTestId('trigger-btn'))
    expect(screen.getByRole('option', { name: 'VueJS' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('should call onInputChange when value changes', async () => {
    const onInputChange = vi.fn()

    render(<ComponentUnderTest onInputChange={onInputChange} />)

    const inputField = screen.getByRole('combobox')
    await user.type(inputField, 'react')
    expect(inputField).toHaveValue('react')
    expect(onInputChange).toBeCalledWith({ value: 'react' })
  })
})
