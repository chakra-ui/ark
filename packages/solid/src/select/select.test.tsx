import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For, Portal } from 'solid-js/web'
import { vi } from 'vitest'
import type { Optional } from '../types'
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
  type SelectProps,
} from './'
import { SelectControl } from './select-control'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const ComponentUnderTest = (props: Optional<SelectProps<Item>, 'items'>) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select items={items} {...props}>
      <SelectLabel>Framework</SelectLabel>
      <SelectControl>
        <SelectTrigger data-testid="trigger">
          <SelectValue placeholder="Select a Framework" />
        </SelectTrigger>
        <SelectClearTrigger>Clear</SelectClearTrigger>
      </SelectControl>
      <Portal>
        <SelectPositioner>
          <SelectContent>
            <SelectItemGroup id="framework">
              <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
              <For each={items}>
                {(item) => (
                  <SelectItem item={item}>
                    <SelectItemText>{item.label}</SelectItemText>
                    <SelectItemIndicator>✓</SelectItemIndicator>
                  </SelectItem>
                )}
              </For>
            </SelectItemGroup>
          </SelectContent>
        </SelectPositioner>
      </Portal>
    </Select>
  )
}
describe('Select', () => {
  it('should render', async () => {
    render(() => <ComponentUnderTest />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    expect(trigger).toBeInTheDocument()
  })

  it.skip('should handle item selection', async () => {
    render(() => <ComponentUnderTest />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)

    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())
    user.click(screen.getByRole('option', { name: 'React' }))
    await waitFor(() => expect(screen.getByTestId('trigger')).toHaveTextContent('React'))
  })

  it('should close on select', async () => {
    render(() => <ComponentUnderTest />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    const item = screen.getByText('React')
    user.click(item)
    await waitFor(() => expect(screen.queryByText('Frameworks')).not.toBeVisible())
  })

  it('should be disabled when disabled is true', async () => {
    render(() => <ComponentUnderTest disabled />)
    const trigger = screen.getByRole('button', { name: 'Framework' })

    expect(trigger).toBeDisabled()
  })

  it('should handle multiple selection', async () => {
    render(() => <ComponentUnderTest multiple />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    const itemReact = screen.getByText('React')
    const itemVue = screen.getByText('Vue')
    user.click(itemReact)
    user.click(itemVue)
    await waitFor(() => expect(trigger).toHaveTextContent('React, Vue'))
  })

  it('should call onChange when item is selected', async () => {
    const onChange = vi.fn()
    render(() => <ComponentUnderTest onChange={onChange} />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    const item = screen.getByText('React')
    user.click(item)
    waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(() => <ComponentUnderTest onOpenChange={onOpenChange} />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(() => <ComponentUnderTest readOnly />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    await waitFor(() => expect(screen.queryByText('React')).not.toBeVisible())
  })
})
