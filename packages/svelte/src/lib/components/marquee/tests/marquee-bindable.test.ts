import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './marquee-bindable.test.svelte'

describe('Marquee / bindable', () => {
  it('should write back bind:paused', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button', { name: 'pause' }))
    await waitFor(() => expect(screen.getByTestId('paused')).toHaveTextContent('true'))
  })
})
