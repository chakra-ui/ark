import { render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './combobox-field.test.svelte'

describe('Combobox / Field', () => {
  it('should describe the input with the helper and error text', async () => {
    render(ComponentUnderTest)
    await waitFor(async () =>
      expect(await screen.findByRole('combobox', { name: 'Label' })).toHaveAccessibleDescription(
        'Additional Info Error Info',
      ),
    )
  })
})
