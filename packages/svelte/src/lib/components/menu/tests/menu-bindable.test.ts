import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './menu-bindable.test.svelte'

describe('Menu / bindable', () => {
  it('should write back bind:triggerValue', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button', { name: 'Second' }))
    await waitFor(() => expect(screen.getByTestId('trigger')).toHaveTextContent('second'))
  })

  it('should write back bind:highlightedValue', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button', { name: 'First' }))
    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(screen.getByTestId('highlighted')).not.toHaveTextContent('null'))
  })
})
