import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { collection } from '@zag-js/combobox'
import { vi } from 'vitest'
import { Portal } from '..'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxTrigger,
  type ComboboxProps,
} from './'

const ComponentUnderTest = (props: Omit<ComboboxProps, 'collection'>) => {
  const frameworks = collection({
    items: [{ value: 'React' }, { value: 'Solid' }, { value: 'Vue' }],
  })

  return (
    <Combobox collection={frameworks} {...props}>
      {({ isInputValueEmpty, isOpen }) => (
        <>
          <ComboboxLabel>JS Frameworks</ComboboxLabel>
          <ComboboxControl>
            <ComboboxInput />
            <ComboboxTrigger>▼</ComboboxTrigger>
            <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
          </ComboboxControl>
          {isInputValueEmpty && !isOpen && <div>Give me you favorite framework!</div>}
          <Portal>
            <ComboboxPositioner>
              <ComboboxContent>
                <ComboboxItemGroup id="framework">
                  <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
                  {frameworks.toArray().map((item) => (
                    <ComboboxItem key={item.value} item={item}>
                      {item.value}
                    </ComboboxItem>
                  ))}
                </ComboboxItemGroup>
              </ComboboxContent>
            </ComboboxPositioner>
          </Portal>
        </>
      )}
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
