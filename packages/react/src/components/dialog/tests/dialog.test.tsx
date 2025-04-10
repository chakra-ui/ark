import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('Dialog', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should show dialog content when opened', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('Open Dialog'))
    expect(await screen.findByText('Dialog Title')).toBeVisible()

    await user.click(screen.getByText('Close'))
    await waitFor(() => expect(screen.queryByText('Dialog Title')).not.toBeVisible())
  })

  it('should invoke onOpenChange if dialog is closed', async () => {
    const onOpenChange = vi.fn()
    render(<ComponentUnderTest open onOpenChange={onOpenChange} />)

    await user.click(screen.getByText('Close'))
    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeVisible())

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.getByRole('button', { name: 'Open Dialog' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should be fully controlled (true)', async () => {
    render(<ComponentUnderTest open={true} />)
    expect(screen.queryByRole('button', { name: 'Close' })).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('button', { name: 'Close' })).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(<ComponentUnderTest open={false} />)

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })
})
