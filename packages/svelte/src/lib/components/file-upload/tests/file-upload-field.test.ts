import { render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './file-upload-field.test.svelte'

describe('FileUpload / Field', () => {
  it('should describe the trigger and dropzone with the helper and error text', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    await waitFor(async () =>
      expect(await screen.findByRole('button', { name: 'Select' })).toHaveAccessibleDescription(
        'Additional Info Error Info',
      ),
    )
    await waitFor(async () =>
      expect(screen.getByRole('button', { name: /dropzone/i })).toHaveAccessibleDescription(
        'Additional Info Error Info',
      ),
    )
  })

  it('should set file upload as read-only', async () => {
    render(ComponentUnderTest, { props: { readOnly: true } })
    const dropzone = await screen.findByRole('button', { name: /dropzone/i })
    expect(dropzone).toHaveAttribute('aria-disabled', 'true')
    expect(dropzone).toHaveAttribute('data-readonly')
  })
})
