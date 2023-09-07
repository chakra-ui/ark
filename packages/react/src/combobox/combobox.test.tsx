import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Portal } from '..'
import type { Optional } from '../types'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxTrigger,
  type ComboboxProps,
} from './'

const ComponentUnderTest = (props: Optional<ComboboxProps, 'items'>) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Combobox items={items} {...props}>
      <ComboboxLabel>Framework</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger>Open</ComboboxTrigger>
        <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxItemGroup id="framework">
              <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
              {items.map((item) => (
                <ComboboxItem key={item.value} item={item}>
                  <ComboboxItemText>{item.label}</ComboboxItemText>
                  <ComboboxItemIndicator>✓</ComboboxItemIndicator>
                </ComboboxItem>
              ))}
            </ComboboxItemGroup>
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
