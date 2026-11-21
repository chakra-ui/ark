import { render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './switch-field.test.svelte'

describe('Switch / Field', () => {
  it('should describe the hidden input with the helper and error text', async () => {
    render(ComponentUnderTest)
    await waitFor(async () =>
      expect(await screen.findByRole('checkbox', { name: 'Label' })).toHaveAccessibleDescription(
        'Additional Info Error Info',
      ),
    )
  })
})
