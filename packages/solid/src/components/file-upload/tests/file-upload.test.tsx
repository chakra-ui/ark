import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { FileUpload } from '@ark-ui/solid/file-upload'
import { createSignal } from 'solid-js'
import { FileUploadWithField } from './basic.tsx'

describe('File Upload / Field', () => {
  it('should describe the trigger and dropzone with the helper and error text', async () => {
    render(() => <FileUploadWithField invalid />)
    expect(screen.getByRole('button', { name: 'Select' })).toHaveAccessibleDescription('Error Info Additional Info')
    expect(screen.getByRole('button', { name: 'dropzone' })).toHaveAccessibleDescription('Error Info Additional Info')
  })

  it('should set file upload as required', async () => {
    render(() => <FileUploadWithField required />)
    expect(screen.getByTestId('input')).toBeRequired()
  })

  it('should set file upload as read-only', async () => {
    render(() => <FileUploadWithField readOnly />)
    expect(screen.getByRole('button', { name: 'dropzone' })).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('button', { name: 'dropzone' })).toHaveAttribute('data-readonly')
  })

  it('should set file upload as disabled', async () => {
    render(() => <FileUploadWithField disabled />)
    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should display helper text', async () => {
    render(() => <FileUploadWithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(() => <FileUploadWithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(() => <FileUploadWithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByTestId('input')).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(() => <FileUploadWithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})

describe('File Upload / ItemPreviewImage', () => {
  const file = new File([''], 'photo.png', { type: 'image/png' })

  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:photo')
    URL.revokeObjectURL = vi.fn()
  })

  const PreviewImage = (props: { file: File }) => (
    <FileUpload.Root defaultAcceptedFiles={[file]}>
      <FileUpload.Dropzone>Drop</FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUpload.Item file={props.file}>
          <FileUpload.ItemPreviewImage alt="preview" />
        </FileUpload.Item>
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  )

  it('should keep the preview url while the root re-renders', async () => {
    render(() => <PreviewImage file={file} />)
    await user.click(screen.getByText('Drop'))
    await user.tab()

    expect(screen.getByAltText('preview')).toHaveAttribute('src', 'blob:photo')
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
    expect(URL.revokeObjectURL).not.toHaveBeenCalled()
  })

  it('should revoke the url when the file changes and on unmount', async () => {
    const [current, setCurrent] = createSignal(file)
    const { unmount } = render(() => <PreviewImage file={current()} />)
    setCurrent(new File([''], 'other.png', { type: 'image/png' }))
    expect(URL.createObjectURL).toHaveBeenCalledTimes(2)
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)

    unmount()
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(2)
  })
})
