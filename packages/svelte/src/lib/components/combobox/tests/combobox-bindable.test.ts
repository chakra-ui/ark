import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './combobox-bindable.test.svelte'

describe('Combobox / bindable', () => {
  it('should write back bind:highlightedValue', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(screen.getByTestId('highlighted')).not.toHaveTextContent('null'))
  })
})
