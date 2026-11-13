import { render, screen } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ComponentUnderTest from './file-upload-preview-image.test.svelte'

describe('FileUpload / ItemPreviewImage', () => {
  const file = new File([''], 'photo.png', { type: 'image/png' })

  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:photo')
    URL.revokeObjectURL = vi.fn()
  })

  it('should keep the preview url while the root re-renders', async () => {
    render(ComponentUnderTest, { props: { file } })
    await user.click(screen.getByText('Drop'))
    await user.tab()

    expect(await screen.findByAltText('preview')).toHaveAttribute('src', 'blob:photo')
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
    expect(URL.revokeObjectURL).not.toHaveBeenCalled()
  })

  it('should revoke the url when the file changes and on unmount', async () => {
    const { rerender, unmount } = render(ComponentUnderTest, { props: { file } })
    await rerender({ file: new File([''], 'other.png', { type: 'image/png' }) })
    expect(URL.createObjectURL).toHaveBeenCalledTimes(2)
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)

    unmount()
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(2)
  })
})
