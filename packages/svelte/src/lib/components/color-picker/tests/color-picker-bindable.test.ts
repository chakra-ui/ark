import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './color-picker-bindable.test.svelte'

describe('ColorPicker / bindable', () => {
  it('should write back bind:format from the format trigger', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByText('Toggle format'))
    await waitFor(() => expect(screen.getByTestId('format')).toHaveTextContent('hsba'))
  })

  it('should write back bind:format from api.setFormat', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button', { name: 'hsla' }))
    await waitFor(() => expect(screen.getByTestId('format')).toHaveTextContent('hsla'))
  })
})
