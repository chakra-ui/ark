import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For, Portal } from 'solid-js/web'
import { vi } from 'vitest'
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
} from '.'
import type { Optional } from '../types'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const ComponentUnderTest = (props: Optional<ComboboxProps<Item>, 'items'>) => {
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
        <ComboboxTrigger data-testid="trigger">Open</ComboboxTrigger>
        <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxItemGroup id="framework">
              <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
              <For each={items}>
                {(item) => (
                  <ComboboxItem item={item}>
                    <ComboboxItemText>{item.label}</ComboboxItemText>
                    <ComboboxItemIndicator>✓</ComboboxItemIndicator>
                  </ComboboxItem>
                )}
              </For>
            </ComboboxItemGroup>
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
    expect(screen.getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()
    user.click(screen.getByTestId('trigger'))

    waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())
  })

  it('should handle item selection', async () => {
    render(() => <ComponentUnderTest />)

    user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    user.click(screen.getByRole('option', { name: 'React' }))

    await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('React'))
  })

  it('should call onChange when item is selected', async () => {
    const onChange = vi.fn()
    render(() => <ComponentUnderTest onChange={onChange} />)

    user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    user.click(screen.getByRole('option', { name: 'React' }))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpen is called', async () => {
    const onOpen = vi.fn()
    render(() => <ComponentUnderTest onOpen={onOpen} />)
    user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(() => <ComponentUnderTest readOnly />)
    user.click(screen.getByTestId('trigger'))

    await waitFor(() => expect(screen.queryByText('React')).not.toBeVisible())
  })
})
