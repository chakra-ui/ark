import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import ComponentUnderTest from './drawer.test.vue'

const user = userEvent.setup()

const openDrawer = async () => {
  await user.click(screen.getByRole('button', { name: 'Open Drawer' }))
  return screen.findByRole('dialog')
}

describe('Drawer', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)
    expect(await axe(container)).toHaveNoViolations()

    expect(await axe(await openDrawer())).toHaveNoViolations()
  })

  it('should open with the trigger and close with the close trigger', async () => {
    render(ComponentUnderTest)
    const trigger = screen.getByRole('button', { name: 'Open Drawer' })
    const dialog = await openDrawer()

    expect(dialog).toBeVisible()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('should label the content with its title and description', async () => {
    render(ComponentUnderTest)
    const dialog = await openDrawer()

    expect(dialog).toHaveAccessibleName('Drawer Title')
    expect(dialog).toHaveAccessibleDescription('Drawer Description')
  })

  it('should close on Escape and return focus to the trigger', async () => {
    render(ComponentUnderTest)
    const trigger = screen.getByRole('button', { name: 'Open Drawer' })
    const dialog = await openDrawer()
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement))

    await user.keyboard('[Escape]')

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('should call onOpenChange', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { onOpenChange } })
    await openDrawer()

    expect(onOpenChange).toHaveBeenLastCalledWith(expect.objectContaining({ open: true }))

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onOpenChange).toHaveBeenLastCalledWith(expect.objectContaining({ open: false }))
  })

  it('should stay open when controlled', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { open: true, onOpenChange } })

    await user.click(await screen.findByRole('button', { name: 'Close' }))
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: false })))

    expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open')
  })

  it('should lazy mount', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await openDrawer()
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should set the merged data attributes and the swipe direction', async () => {
    render(ComponentUnderTest, { props: { swipeDirection: 'end' } })
    const trigger = screen.getByRole('button', { name: 'Open Drawer' })
    const dialog = await openDrawer()

    expect(dialog).toHaveAttribute('data-drawer-content')
    expect(dialog).toHaveAttribute('data-swipe-direction', 'right')
    expect(screen.getByTestId('positioner')).toHaveAttribute('data-drawer-positioner')
    expect(screen.getByTestId('grabber')).toHaveAttribute('data-drawer-grabber')
    expect(trigger).toHaveAttribute('data-drawer-trigger')
  })
})
