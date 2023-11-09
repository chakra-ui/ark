import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Menu } from './'

describe('Menu', () => {
  it('should be able to lazy mount', async () => {
    render(() => (
      <Menu.Root lazyMount>
        <Menu.Trigger>Open menu</Menu.Trigger>
        <Menu.Positioner data-testid="positioner">
          <Menu.Content>
            <span>content</span>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    ))
    const menutrigger = screen.getByRole('button', { name: 'Open menu' })
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
    expect(menutrigger).not.toHaveAttribute('aria-controls')

    await user.click(menutrigger)
    expect(screen.queryByTestId('positioner')).toBeInTheDocument()
    expect(menutrigger).toHaveAttribute('aria-controls')
  })
})
