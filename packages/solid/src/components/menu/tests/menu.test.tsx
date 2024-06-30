import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import { anatomy } from '@zag-js/menu'
import { Index, splitProps } from 'solid-js'
import { Menu } from '..'
import { getExports, getParts } from '../../../setup-test'

interface ComponentUnderTestProps extends Menu.RootProps {
  onValueChange?: (e: { value: string }) => void
}

const ComponentUnderTest = (props: ComponentUnderTestProps) => {
  const [radioGroupProps, localProps] = splitProps(props, ['onValueChange'])
  return (
    <Menu.Root {...localProps}>
      <Menu.Trigger>
        Open menu <Menu.Indicator />
      </Menu.Trigger>
      <Menu.ContextTrigger>Open Context Menu</Menu.ContextTrigger>
      <Menu.Positioner data-testid="positioner">
        <Menu.Content>
          <Menu.Arrow>
            <Menu.ArrowTip />
          </Menu.Arrow>
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
          <Menu.RadioItemGroup value="react" {...radioGroupProps}>
            <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
            <Index each={['react', 'solid', 'svelte', 'vue']}>
              {(framework) => (
                <Menu.RadioItem value={framework()} disabled={framework() === 'svelte'}>
                  <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                  <Menu.ItemText>{framework()}</Menu.ItemText>
                </Menu.RadioItem>
              )}
            </Index>
          </Menu.RadioItemGroup>
          <Menu.Separator />
          <Menu.Root>
            <Menu.TriggerItem>CSS Frameworks</Menu.TriggerItem>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="panda">Panda</Menu.Item>
                <Menu.Item value="tailwind">Tailwind</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

describe('Menu / Parts & Exports', () => {
  it.skip.each(getParts(anatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(Menu[part]).toBeDefined()
  })
})

describe('Menu', () => {
  it('should set correct aria attributes on disabled MenuItems', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Dialog')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not fire onValueChange on disabled MenuItems', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)
    fireEvent.click(screen.getByText(/svelte/i))
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

    await waitFor(() =>
      expect(screen.getByRole('menu')).toHaveAttribute('data-placement', 'left-start'),
    )
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
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
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
    render(() => <ComponentUnderTest />)
    const button = screen.getByRole('button', { name: /Open Context Menu/i })
    fireEvent.contextMenu(button)
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())
  })

  it('should open on nested menu', async () => {
    render(() => <ComponentUnderTest />)
    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())
    fireEvent.click(screen.getByText(/CSS Frameworks/i))
    await waitFor(() => expect(screen.getByText(/Panda/i)).toBeVisible())
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
