import { act, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic.tsx'

describe('Toast', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should show and hide a toast message', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('Create Toast'))

    await waitFor(() => expect(screen.queryByText('Title')).toBeVisible())
    await waitFor(() => expect(screen.queryByText('Description')).toBeVisible())
    await user.click(screen.getByText('Close'))

    await waitFor(() => expect(screen.queryByText('Title')).not.toBeInTheDocument())
  })

  it('should forward the label to the toast region', () => {
    render(<ComponentUnderTest />)

    const region = screen.getByRole('region')
    expect(region).toHaveAccessibleName(expect.stringContaining('Alerts'))
    expect(region).not.toHaveAttribute('label')
  })

  it('should forward dir to the machine, flipping the placement edge', () => {
    render(<ComponentUnderTest dir="rtl" />)

    const region = screen.getByRole('region')
    expect(region).toHaveAttribute('dir', 'rtl')
    expect(region.style.alignItems).toBe('flex-start')
    expect(region.style.insetInlineStart).not.toBe('')
  })

  it('should forward getRootNode to the machine rather than the region element', async () => {
    const getRootNode = vi.fn(() => document)
    render(<ComponentUnderTest getRootNode={getRootNode} />)

    await user.click(screen.getByText('Create Toast'))

    expect(getRootNode).toHaveBeenCalled()
    expect(screen.getByRole('region')).not.toHaveAttribute('getrootnode')
  })
})
