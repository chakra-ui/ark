import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/controlled.svelte'

describe('Tooltip', () => {
  it('should open when the controlled open prop is set', async () => {
    render(ComponentUnderTest)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))

    await waitFor(() => expect(screen.getByRole('tooltip')).toBeVisible())
  })

  it('should close when the controlled open prop is unset', async () => {
    render(ComponentUnderTest)
    const toggle = screen.getByRole('button', { name: 'Toggle' })

    await user.click(toggle)
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeVisible())

    await user.click(toggle)
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })
})
