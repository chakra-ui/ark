import { userEvent as user } from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './menu.test.vue'

describe('Menu', () => {
  it('should set correct aria attributes on disabled MenuItems', () => {
    render(ComponentUnderTest)

    expect(screen.getByText('Dialog')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not fire onValueChange on disabled MenuItems', async () => {
    const { emitted } = render(ComponentUnderTest)
    await user.click(screen.getByText(/svelte/i))
    expect(emitted()).not.toHaveProperty('valueChange')
  })

  it('should apply correct role to MenuItemGroup', async () => {
    render(ComponentUnderTest)

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))
  })

  it.skip('should accept a custom placement', async () => {
    render(ComponentUnderTest, { props: { dir: 'rtl', positioning: { placement: 'left-start' } } })

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    const menuList = screen.getByRole('menu')
    expect(menuList).toHaveAttribute('data-placement', 'left-start')
  })

  it('should control the open state', async () => {
    render(ComponentUnderTest, { props: { defaultOpen: true } })

    const text = await screen.findByText('JS Frameworks')
    expect(text).toBeVisible()
  })

  it('should be able to lazy mount', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', { name: 'Open menu' })

    await user.click(trigger)
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it.skip('should not have aria-controls if lazy mounted', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })

    expect(screen.getByRole('button', { name: 'Open menu' })).not.toHaveAttribute('aria-controls')
  })

  it.skip('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', { name: 'Open menu' })

    await user.click(trigger)
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  })

  it.skip('should open on context menu', async () => {
    render(ComponentUnderTest, { props: { contextMenu: true } })

    const button = screen.getByRole('button', { name: /Open Context Menu/i })

    fireEvent.contextMenu(button)
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())
  })

  it.skip('should open on nested menu', async () => {
    render(ComponentUnderTest)

    const button = screen.getByRole('button', { name: /open menu/i })

    await user.click(button)
    await waitFor(() => expect(screen.getByText(/Ark UI/i)).toBeVisible())

    await user.click(screen.getByText(/CSS Frameworks/i))
    await waitFor(() => expect(screen.getByText(/Panda/i)).toBeVisible())
  })

  it.skip('should select a radio option', async () => {
    render(ComponentUnderTest)

    const menuButton = screen.getByRole('button', { name: /open menu/i })
    await user.click(menuButton)

    const radioButton = screen.getByRole('menuitemradio', { name: /react/i })
    await user.click(radioButton)
    await waitFor(() => expect(radioButton).toHaveAttribute('aria-checked', 'true'))
  })
})
