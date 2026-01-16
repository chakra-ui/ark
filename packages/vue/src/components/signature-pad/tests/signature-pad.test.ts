import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import SignaturePadWithField from './signature-pad-with-field.test.vue'

describe('Signature Pad / Field', () => {
  it('should set signature pad as required', async () => {
    render(SignaturePadWithField, { props: { required: true } })
    expect(screen.getByRole('textbox', { hidden: true })).toBeRequired()
  })

  it('should set signature pad as disabled', async () => {
    render(SignaturePadWithField, { props: { disabled: true } })
    expect(screen.getByRole('application')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set signature pad as readonly', async () => {
    render(SignaturePadWithField, { props: { readOnly: true } })
    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(SignaturePadWithField)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(SignaturePadWithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(SignaturePadWithField)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { hidden: true })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(SignaturePadWithField)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
