import { fireEvent, render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'
import AnimatedComponentUnderTest from './tests/tabs-animated.test.svelte'

describe('Tabs', () => {
  it('should set the presence data-state on the content', async () => {
    render(ComponentUnderTest)

    expect(screen.getByText('Make changes to your account here.')).toHaveAttribute('data-state', 'open')
    expect(screen.getByText('Change your password here.')).toHaveAttribute('data-state', 'closed')

    await user.click(screen.getByRole('tab', { name: 'Password' }))

    expect(screen.getByText('Change your password here.')).toHaveAttribute('data-state', 'open')
    expect(screen.getByText('Make changes to your account here.')).toHaveAttribute('data-state', 'closed')
  })

  it('should keep the outgoing panel visible until its exit animation ends', async () => {
    render(AnimatedComponentUnderTest)

    const account = screen.getByText('Account panel')
    expect(account).toBeVisible()

    await user.click(screen.getByRole('tab', { name: 'Password' }))

    expect(account).toHaveAttribute('data-state', 'closed')
    expect(account).toBeVisible()

    await fireEvent.animationEnd(account, { animationName: 'exit' })

    await waitFor(() => expect(account).not.toBeVisible())
  })
})
