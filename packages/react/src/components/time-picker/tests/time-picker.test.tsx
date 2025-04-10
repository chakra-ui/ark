import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('Time Picker', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  }, 10000)

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  }, 10000)

  it('should be fully controlled (true)', async () => {
    render(<ComponentUnderTest open={true} />)

    const closeButton = screen.getByRole('button', { name: 'Close calendar' })

    expect(closeButton).toBeVisible()

    await user.click(closeButton)
    expect(closeButton).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(<ComponentUnderTest open={false} />)

    const closeButton = screen.queryByRole('button', { name: 'Close calendar' })
    expect(closeButton).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(closeButton).not.toBeInTheDocument()
  })
})
