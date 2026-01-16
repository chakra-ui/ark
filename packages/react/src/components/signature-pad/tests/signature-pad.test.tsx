import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest, SignaturePadWithField } from './basic'

describe('SignaturePad ', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('Signature Pad / Field', () => {
  it('should set signature pad as required', async () => {
    render(<SignaturePadWithField required />)
    expect(screen.getByRole('textbox', { hidden: true })).toBeRequired()
  })

  it('should set signature pad as disabled', async () => {
    render(<SignaturePadWithField disabled />)
    expect(screen.getByRole('application')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set signature pad as readonly', async () => {
    render(<SignaturePadWithField readOnly />)
    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('readonly', '')
  })

  it('should display helper text', async () => {
    render(<SignaturePadWithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<SignaturePadWithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on signature pad when label is clicked', async () => {
    render(<SignaturePadWithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { hidden: true })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<SignaturePadWithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
