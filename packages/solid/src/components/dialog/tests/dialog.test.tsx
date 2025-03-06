import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { ComponentUnderTest } from './basic'

describe('Dialog', () => {
  it('should show dialog content when opened', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByText('Open Dialog'))
    expect(await screen.findByText('Dialog Title')).toBeVisible()

    await user.click(screen.getByText('Close'))
    await waitFor(() => expect(screen.queryByText('Dialog Title')).not.toBeVisible())
  })

  it('should invoke onClose if dialog is closed', async () => {
    const onOpenChange = vi.fn()
    render(() => <ComponentUnderTest open onOpenChange={onOpenChange} />)
    await user.click(screen.getByText('Close'))

    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should be able to lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.getByRole('button', { name: 'Open Dialog' })).not.toHaveAttribute('aria-controls')
  })
})
