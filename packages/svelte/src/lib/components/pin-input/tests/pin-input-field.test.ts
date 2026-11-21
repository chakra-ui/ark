import { render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './pin-input-field.test.svelte'

describe('PinInput / Field', () => {
  it('should describe the group with the helper and error text', async () => {
    render(ComponentUnderTest)
    await waitFor(async () =>
      expect(await screen.findByRole('group', { name: 'Label' })).toHaveAccessibleDescription(
        'Additional Info Error Info',
      ),
    )
  })
})
