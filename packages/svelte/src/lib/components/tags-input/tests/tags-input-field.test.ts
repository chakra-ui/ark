import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './tags-input-field.test.svelte'

describe('TagsInput / Field', () => {
  it('should describe the input with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByRole('textbox')).toHaveAccessibleDescription('Error Info Additional Info')
  })
})
