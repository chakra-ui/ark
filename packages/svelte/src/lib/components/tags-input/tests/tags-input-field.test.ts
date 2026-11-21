import { render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './tags-input-field.test.svelte'

describe('TagsInput / Field', () => {
  it('should describe the input with the helper and error text', async () => {
    render(ComponentUnderTest)
    await waitFor(async () =>
      expect(await screen.findByRole('textbox')).toHaveAccessibleDescription('Additional Info Error Info'),
    )
  })
})
