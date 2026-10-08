import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './toc-bindable.test.svelte'

describe('Toc / bindable', () => {
  it('should write back bind:activeIds', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button', { name: 'activate' }))
    await waitFor(() => expect(screen.getByTestId('active')).toHaveTextContent('usage'))
  })
})
