import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './color-picker-field.test.svelte'

describe('ColorPicker / Field', () => {
  it('should describe the trigger and channel input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByRole('button', { name: 'Label' })).toHaveAccessibleDescription(
      'Error Info Additional Info',
    )
    expect(screen.getByRole('textbox', { name: 'hex' })).toHaveAccessibleDescription('Error Info Additional Info')
  })
})
