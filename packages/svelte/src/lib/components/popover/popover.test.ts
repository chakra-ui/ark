import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './tests/popover.test.svelte'

describe('Popover', () => {
  it('should label lazy mounted content by its title', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })

    await user.click(screen.getByRole('button', { name: 'click me' }))
    await waitFor(() => expect(screen.getByRole('dialog', { name: 'title' })).toBeInTheDocument())
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription('description')
  })
})
