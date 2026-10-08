import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './select-bindable.test.svelte'

describe('Select / bindable', () => {
  it('should write back bind:open', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('combobox'))
    await waitFor(() => expect(screen.getByTestId('open')).toHaveTextContent('true'))
  })

  it('should close when the bound open is set to false', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('combobox'))
    await waitFor(() => expect(screen.getByRole('listbox')).toBeVisible())

    await user.click(screen.getByRole('button', { name: 'close' }))
    await waitFor(() => expect(screen.getByTestId('open')).toHaveTextContent('false'))
    await waitFor(() => expect(screen.getByRole('listbox', { hidden: true })).not.toBeVisible())
  })

  it('should write back bind:highlightedValue', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(screen.getByTestId('highlighted')).not.toHaveTextContent('null'))
  })
})
