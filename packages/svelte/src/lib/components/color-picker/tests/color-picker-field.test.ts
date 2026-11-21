import { render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './color-picker-field.test.svelte'

describe('ColorPicker / Field', () => {
  it('should describe the trigger and channel input with the helper and error text', async () => {
    render(ComponentUnderTest)
    await waitFor(async () =>
      expect(await screen.findByRole('button', { name: 'Label' })).toHaveAccessibleDescription(
        'Additional Info Error Info',
      ),
    )
    await waitFor(async () =>
      expect(screen.getByRole('textbox', { name: /hex/i })).toHaveAccessibleDescription('Additional Info Error Info'),
    )
  })
})
