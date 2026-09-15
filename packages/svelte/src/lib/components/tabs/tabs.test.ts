import { render, screen } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'

describe('Tabs', () => {
  it('should set the presence data-state on the content', async () => {
    render(ComponentUnderTest)

    expect(screen.getByText('Make changes to your account here.')).toHaveAttribute('data-state', 'open')
    expect(screen.getByText('Change your password here.')).toHaveAttribute('data-state', 'closed')

    await user.click(screen.getByRole('tab', { name: 'Password' }))

    expect(screen.getByText('Change your password here.')).toHaveAttribute('data-state', 'open')
    expect(screen.getByText('Make changes to your account here.')).toHaveAttribute('data-state', 'closed')
  })
})
