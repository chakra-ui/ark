import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './combobox-field.test.svelte'

describe('Combobox / Field', () => {
  it('should describe the input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByRole('combobox', { name: 'Label' })).toHaveAccessibleDescription(
      'Error Info Additional Info',
    )
  })
})
