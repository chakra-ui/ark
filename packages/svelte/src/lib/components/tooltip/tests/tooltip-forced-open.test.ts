import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './tooltip-forced-open.test.svelte'

describe('Tooltip / function binding', () => {
  it('stays open while the getter returns true, even after a close request', async () => {
    render(ComponentUnderTest)
    await waitFor(() => expect(screen.getByText('Tooltip text')).toBeVisible())

    await user.hover(screen.getByText('Hover me'))
    await user.unhover(screen.getByText('Hover me'))
    await user.hover(screen.getByText('Hover me'))
    await waitFor(() => expect(screen.getByTestId('requested')).toHaveTextContent('true'))
    await user.unhover(screen.getByText('Hover me'))
    await waitFor(() => expect(screen.getByTestId('requested')).toHaveTextContent('false'))
    await waitFor(() =>
      expect(screen.getByText('Tooltip text').closest('[data-state]')).toHaveAttribute('data-state', 'open'),
    )
  })
})
