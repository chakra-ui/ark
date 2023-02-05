import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { vi } from 'vitest'
import { Teleport } from 'vue'
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptionProps,
  ComboboxPositioner,
  ComboboxProps,
  ComboboxTrigger,
} from '.'

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
        <ComboboxTrigger>
          <button data-testid="trigger-btn">▼</button>
        </ComboboxTrigger>
      </ComboboxControl>
      <Teleport to="body">
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
      </Teleport>
    </Combobox>
  )
}

describe('Combobox', () => {
  it('should render', () => {
    render(ComponentUnderTest)
  })

  it('should show options on click', async () => {
    const { getByRole, getByTestId } = render(ComponentUnderTest)
    expect(getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible()

    await user.click(getByTestId('trigger-btn'))
    expect(getByRole('option', { name: 'ReactJS' })).toBeVisible()
  })

  it('should show a disabled option', async () => {
    const { getByRole, getByTestId } = render(ComponentUnderTest)
    expect(getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible()

    await user.click(getByTestId('trigger-btn'))
    expect(getByRole('option', { name: 'VueJS' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('should call onInputChange when value changes', async () => {
    const onInputChange = vi.fn()

    const { getByRole } = render(ComponentUnderTest, { props: { onInputChange } })

    const inputField = getByRole('combobox')
    await user.type(inputField, 'react')
    expect(inputField).toHaveValue('react')
  })
})
