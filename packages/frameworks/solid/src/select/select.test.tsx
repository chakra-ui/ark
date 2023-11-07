import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For, Portal } from 'solid-js/web'
import { vi } from 'vitest'
import type { Optional } from '../types'
import { Select, type SelectProps } from './'

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
    <Select.Root items={items} {...props}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger data-testid="trigger">
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner data-testid="positioner">
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel for="framework">Frameworks</Select.ItemGroupLabel>
              <For each={items}>
                {(item) => (
                  <Select.Item item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </For>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
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
    const item = screen.getByText('React', { ignore: 'option' })
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
    const itemReact = screen.getByText('React', { ignore: 'option' })
    const itemVue = screen.getByText('Vue', { ignore: 'option' })
    user.click(itemReact)
    user.click(itemVue)
    await waitFor(() => expect(trigger).toHaveTextContent('React, Vue'))
  })

  it('should call onChange when item is selected', async () => {
    const onChange = vi.fn()
    render(() => <ComponentUnderTest onChange={onChange} />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    user.click(trigger)
    const item = screen.getByText('React', { ignore: 'option' })
    user.click(item)
    await waitFor(() => {
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
    await waitFor(() => expect(screen.queryByText('React', { ignore: 'option' })).not.toBeVisible())
  })

  it('should be able to lazy mount its items', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Framework' }))
    expect(screen.queryByTestId('positioner')).toBeInTheDocument()
  })
})
