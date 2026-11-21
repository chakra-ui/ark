import { render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './rating-group-field.test.svelte'

describe('RatingGroup / Field', () => {
  it('should describe the group and its items with the helper and error text', async () => {
    render(ComponentUnderTest)
    await waitFor(async () =>
      expect(await screen.findByRole('radiogroup')).toHaveAccessibleDescription('Additional Info Error Info'),
    )
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toHaveAccessibleDescription('Additional Info Error Info')
    }
  })
})
