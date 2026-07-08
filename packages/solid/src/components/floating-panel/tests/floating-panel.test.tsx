import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { ComponentUnderTest } from './basic.tsx'

describe('FloatingPanel', () => {
  it('should show panel content when opened', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByText('Open Panel'))
    expect(await screen.findByText('Panel Body')).toBeVisible()

    await user.click(screen.getByText('Close'))
    await waitFor(() => expect(screen.queryByText('Panel Body')).not.toBeVisible())
  })

  it('should invoke onOpenChange if panel is closed', async () => {
    const onOpenChange = vi.fn()
    render(() => <ComponentUnderTest open onOpenChange={onOpenChange} />)
    await user.click(screen.getByText('Close'))

    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should be able to lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Panel' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close Window' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.getByRole('button', { name: 'Open Panel' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Panel' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close Window' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})
