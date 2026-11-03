import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './file-upload-field.test.svelte'

describe('FileUpload / Field', () => {
  it('should describe the trigger and dropzone with the helper and error text', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    expect(await screen.findByRole('button', { name: 'Select' })).toHaveAccessibleDescription(
      'Error Info Additional Info',
    )
    expect(screen.getByRole('button', { name: /dropzone/i })).toHaveAccessibleDescription('Error Info Additional Info')
  })

  it('should set file upload as read-only', async () => {
    render(ComponentUnderTest, { props: { readOnly: true } })
    const dropzone = await screen.findByRole('button', { name: /dropzone/i })
    expect(dropzone).toHaveAttribute('aria-disabled', 'true')
    expect(dropzone).toHaveAttribute('data-readonly')
  })
})
