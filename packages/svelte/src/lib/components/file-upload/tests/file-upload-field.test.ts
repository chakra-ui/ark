import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './file-upload-field.test.svelte'

describe('FileUpload / Field', () => {
  it('should describe the trigger and dropzone with the helper and error text', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByRole('button', { name: 'Select' })).toHaveAccessibleDescription(
      'Error Info Additional Info',
    )
    expect(screen.getByRole('button', { name: /dropzone/i })).toHaveAccessibleDescription('Error Info Additional Info')
  })
})
