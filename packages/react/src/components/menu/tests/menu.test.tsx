import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Menu, menuAnatomy } from '..'
import { getExports, getParts } from '../../../setup-test'

interface ComponentUnderTestProps extends Menu.RootProps {
  onValueChange?: (e: { value: string }) => void
}

const ComponentUnderTest = (props: ComponentUnderTestProps) => {
  const { onValueChange, ...rest } = props
  return (
    <Menu.Root {...rest}>
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
          <Menu.RadioItemGroup value="react" onValueChange={onValueChange}>
            <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
            {['react', 'solid', 'vue', 'svelte'].map((framework) => (
              <Menu.RadioItem key={framework} value={framework} disabled={framework === 'svelte'}>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>{framework}</Menu.ItemText>
              </Menu.RadioItem>
            ))}
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
  it.each(getParts(menuAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(menuAnatomy))('should export %s', async (part) => {
    expect(Menu[part]).toBeDefined()
  })
})

describe('Menu', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should set correct aria attributes on disabled MenuItems', () => {
    render(<ComponentUnderTest />)

    expect(screen.getByText('Dialog')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not fire onValueChange on disabled MenuItems', async () => {
    const onValueChange = vi.fn()

    render(<ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByText(/svelte/i))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('should apply correct role to MenuItemGroup', async () => {
    render(<ComponentUnderTest />)

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)

    await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))
  })

  it('should accept a custom placement', async () => {
    render(<ComponentUnderTest positioning={{ placement: 'left-start' }} />)

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    await waitFor(() =>
      expect(screen.getByRole('menu')).toHaveAttribute('data-placement', 'left-start'),
    )
  })

  it('should control the open state', async () => {
    render(<ComponentUnderTest open />)

    const text = await screen.findByText('JS Frameworks')
    expect(text).toBeVisible()
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', { name: 'Open menu' })

    fireEvent.click(trigger)
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())

    fireEvent.click(trigger)
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.getByRole('button', { name: 'Open menu' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', { name: 'Open menu' })

    fireEvent.click(trigger)
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())

    fireEvent.click(trigger)
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should open on context menu', async () => {
    render(<ComponentUnderTest />)

    const button = screen.getByRole('button', { name: /Open Context Menu/i })

    fireEvent.contextMenu(button)
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())
  })

  it('should open on nested menu', async () => {
    render(<ComponentUnderTest />)

    const button = screen.getByRole('button', { name: /open menu/i })

    fireEvent.click(button)
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())

    fireEvent.click(screen.getByText(/CSS Frameworks/i))
    await waitFor(() => expect(screen.getByText(/Panda/i)).toBeVisible())
  })

  it('should select a radio option', async () => {
    render(<ComponentUnderTest />)

    const menuButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(menuButton)
    await waitFor(() => expect(screen.getByText(/JS Frameworks/i)).toBeVisible())

    const radioButton = screen.getByRole('menuitemradio', { name: /react/i })
    fireEvent.click(radioButton)

    await waitFor(() => expect(radioButton).toHaveAttribute('aria-checked', 'true'))
  })
})
