import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './time-picker.test.vue'

describe('Time Picker', () => {
  it('should be able to lazy mount', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  }, 10000)

  it('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  }, 10000)

  it('should be fully controlled (true)', async () => {
    render(ComponentUnderTest, { props: { open: true } })

    const closeButton = screen.getByRole('button', { name: 'Close calendar' })

    expect(closeButton).toBeVisible()

    await user.click(closeButton)
    expect(closeButton).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(ComponentUnderTest, { props: { open: false } })

    const closeButton = screen.queryByRole('button', { name: 'Close calendar' })
    expect(closeButton).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(closeButton).not.toBeInTheDocument()
  })
})
