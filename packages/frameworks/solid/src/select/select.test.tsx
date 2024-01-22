import { selectAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For, Portal } from 'solid-js/web'
import { vi } from 'vitest'
import { getExports, getParts } from '../setup-test'
import type { Optional } from '../types'
import { Select, type SelectRootProps } from './'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const ComponentUnderTest = (props: Optional<SelectRootProps<Item>, 'items'>) => {
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
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>▼</Select.Indicator>
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
  it.each(getParts(selectAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(selectAnatomy))('should export %s', async (part) => {
    expect(Select[part]).toBeDefined()
  })

  it.skip('should handle item selection', async () => {
    render(() => <ComponentUnderTest />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    await user.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })
    await user.click(item)
    await waitFor(() => expect(trigger).toHaveTextContent('React'))
  })

  it('should close on select', async () => {
    render(() => <ComponentUnderTest />)

    const trigger = screen.getByRole('button', { name: 'Framework' })
    fireEvent.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })
    fireEvent.click(item)

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
    await user.click(trigger)
    const itemReact = screen.getByText('React', { ignore: 'option' })
    const itemVue = screen.getByText('Vue', { ignore: 'option' })
    await user.click(itemReact)
    await user.click(itemVue)
    await waitFor(() => expect(trigger).toHaveTextContent('React, Vue'))
  })

  it.skip('should call onValueChange when item is selected', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    const trigger = screen.getByRole('button', { name: 'Framework' })
    await user.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })
    await user.click(item)

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(() => <ComponentUnderTest onOpenChange={onOpenChange} />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    await user.click(trigger)
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(() => <ComponentUnderTest readOnly />)
    const trigger = screen.getByRole('button', { name: 'Framework' })
    await user.click(trigger)
    await waitFor(() => expect(screen.queryByText('React', { ignore: 'option' })).not.toBeVisible())
  })

  it('should be able to lazy mount its items', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Framework' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it.skip('should be able to lazy mount and unmount its items', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Framework' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Framework' }))
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  })
})
