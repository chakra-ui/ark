import { Menu } from '@ark-ui/solid/menu'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import { For } from 'solid-js'
import { splitProps } from '../../../utils/split-props.ts'

interface ComponentUnderTestProps extends Menu.RootProps {
  onValueChange?: (e: { value: string }) => void
  contextMenu?: boolean
}

const ComponentUnderTest = (props: ComponentUnderTestProps) => {
  const [{ contextMenu, onValueChange }, rootProps] = splitProps(props, ['onValueChange', 'contextMenu'])
  return (
    <Menu.Root {...rootProps}>
      <Menu.Trigger>
        Open menu <Menu.Indicator />
      </Menu.Trigger>
      {contextMenu && <Menu.ContextTrigger>Open Context Menu</Menu.ContextTrigger>}
      <Menu.Positioner data-testid="positioner">
        <Menu.Content>
          <Menu.Arrow>
            <Menu.ArrowTip />
          </Menu.Arrow>
          <Menu.List>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Ark UI</Menu.ItemGroupLabel>
              <Menu.Item value="dialog" disabled>
                Dialog
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Separator />
            <Menu.CheckboxItem checked value="checked">
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>Check me</Menu.ItemText>
            </Menu.CheckboxItem>
            <Menu.Separator />
            <Menu.RadioItemGroup value="react" onValueChange={onValueChange}>
              <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
              <For each={['react', 'solid', 'svelte', 'vue']} keyed={false}>
                {(framework) => (
                  <Menu.RadioItem value={framework()} disabled={framework() === 'svelte'}>
                    <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                    <Menu.ItemText>{framework()}</Menu.ItemText>
                  </Menu.RadioItem>
                )}
              </For>
            </Menu.RadioItemGroup>
            <Menu.Separator />
            <Menu.Root>
              <Menu.TriggerItem>CSS Frameworks</Menu.TriggerItem>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.List>
                    <Menu.Item value="panda">Panda</Menu.Item>
                    <Menu.Item value="tailwind">Tailwind</Menu.Item>
                  </Menu.List>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          </Menu.List>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

describe('Menu', () => {
  it('should set correct aria attributes on disabled MenuItems', async () => {
    render(() => <ComponentUnderTest />)
    expect(await screen.findByText('Dialog')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not fire onValueChange on disabled MenuItems', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)
    fireEvent.click(await screen.findByText(/svelte/i))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('should apply correct role to MenuItemGroup', async () => {
    render(() => <ComponentUnderTest />)
    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))
  })

  it('should accept a custom placement', async () => {
    render(() => <ComponentUnderTest positioning={{ placement: 'left-start' }} />)
    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)

    await waitFor(() => expect(screen.getByRole('menu')).toHaveAttribute('data-placement', 'left-start'))
  })

  it('should control the open state', async () => {
    render(() => <ComponentUnderTest open />)
    const text = await screen.findByText('JS Frameworks')
    expect(text).toBeVisible()
  })

  it('should be able to lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(trigger)
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())
    fireEvent.click(trigger)
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.getByRole('button', { name: 'Open menu' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(trigger)
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())
    fireEvent.click(trigger)
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should open on context menu', async () => {
    render(() => <ComponentUnderTest contextMenu />)
    const button = screen.getByRole('button', { name: /Open Context Menu/i })
    fireEvent.contextMenu(button)
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())
  })

  it('should forward value to the context trigger', async () => {
    const onTriggerValueChange = vi.fn()
    render(() => (
      <Menu.Root onTriggerValueChange={onTriggerValueChange}>
        <Menu.ContextTrigger value="first">First</Menu.ContextTrigger>
        <Menu.ContextTrigger value="second">Second</Menu.ContextTrigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.List>
              <Menu.Item value="edit">Edit</Menu.Item>
            </Menu.List>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    ))

    const first = screen.getByRole('button', { name: 'First' })
    const second = screen.getByRole('button', { name: 'Second' })
    expect(first).toHaveAttribute('data-value', 'first')
    expect(first).not.toHaveAttribute('value')

    fireEvent.contextMenu(first)
    await waitFor(() => expect(screen.getByText('Edit')).toBeVisible())
    expect(onTriggerValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: 'first' }))

    fireEvent.contextMenu(second)
    await waitFor(() =>
      expect(onTriggerValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: 'second' })),
    )
    expect(screen.getByText('Edit')).toBeVisible()
  })

  it('should open on nested menu', async () => {
    render(() => <ComponentUnderTest />)
    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())
    fireEvent.click(screen.getByText(/CSS Frameworks/i))
    await waitFor(() => expect(screen.getByText(/Panda/i)).toBeVisible())
  })

  it('should mark a nested trigger as a trigger item once it registers with its parent', async () => {
    render(() => <ComponentUnderTest />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())
    const triggerItem = screen.getByText(/CSS Frameworks/i)
    fireEvent.pointerMove(triggerItem, { pointerType: 'mouse' })
    await waitFor(() => expect(triggerItem).toHaveAttribute('data-menu-trigger-item'))
  })

  it('should select a radio option', async () => {
    render(() => <ComponentUnderTest />)
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(menuButton)
    await waitFor(() => expect(screen.getByText(/JS Frameworks/i)).toBeVisible())
    const radioButton = screen.getByRole('menuitemradio', { name: /react/i })
    fireEvent.click(radioButton)
    await waitFor(() => expect(radioButton).toHaveAttribute('aria-checked', 'true'))
  })
})
