import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
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
