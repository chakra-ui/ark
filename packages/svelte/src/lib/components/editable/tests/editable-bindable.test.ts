import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './editable-bindable.test.svelte'

describe('Editable / bindable', () => {
  it('should write back bind:edit', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByText('Edit'))
    await waitFor(() => expect(screen.getByTestId('edit')).toHaveTextContent('true'))
  })

  it('should leave edit mode when the bound edit is set to false', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByText('Edit'))
    await waitFor(() => expect(screen.getByRole('textbox')).toBeVisible())

    await user.click(screen.getByRole('button', { name: 'stop' }))
    await waitFor(() => expect(screen.getByTestId('edit')).toHaveTextContent('false'))
    await waitFor(() => expect(screen.getByRole('textbox', { hidden: true })).not.toBeVisible())
  })
})
