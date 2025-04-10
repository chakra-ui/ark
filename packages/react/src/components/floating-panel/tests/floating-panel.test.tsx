import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('FloatingPanel', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should show floatingPanel content when opened', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('Open FloatingPanel'))
    expect(await screen.findByText('FloatingPanel Title')).toBeVisible()

    await user.click(screen.getByRole('button', { name: /close window/i }))
    await waitFor(() => expect(screen.queryByText('FloatingPanel Title')).not.toBeVisible())
  })

  it('should invoke onOpenChange if floatingPanel is closed', async () => {
    const onOpenChange = vi.fn()
    render(<ComponentUnderTest open onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole('button', { name: /close window/i }))
    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open FloatingPanel' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    screen.logTestingPlaygroundURL()

    await user.click(screen.getByRole('button', { name: /close window/i }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.getByRole('button', { name: 'Open FloatingPanel' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open FloatingPanel' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close window/i }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should be fully controlled (true)', async () => {
    render(<ComponentUnderTest open={true} />)

    expect(screen.queryByRole('button', { name: /close window/i })).toBeVisible()

    await user.click(screen.getByRole('button', { name: /close window/i }))
    expect(screen.queryByRole('button', { name: /close window/i })).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(<ComponentUnderTest open={false} />)

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open FloatingPanel' }))
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })
})
