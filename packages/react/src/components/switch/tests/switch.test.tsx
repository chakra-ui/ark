import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest, SwitchWithField } from './basic'

describe('Switch', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should toggle state when clicked', async () => {
    const onCheckedChange = vi.fn()
    render(<ComponentUnderTest onCheckedChange={onCheckedChange} />)

    const switchControl = screen.getByText('Label')
    fireEvent.click(switchControl)

    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith({ checked: true }))
  })

  it('should not toggle when disabled', async () => {
    const onCheckedChange = vi.fn()

    render(<ComponentUnderTest onCheckedChange={onCheckedChange} disabled />)

    expect(screen.getByRole('checkbox')).toBeDisabled()

    const switchControl = screen.getByRole('checkbox')
    await user.click(switchControl)

    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('should show invalid attribute when invalid', async () => {
    render(<ComponentUnderTest invalid />)

    const switchControl = screen.getByRole('checkbox')

    expect(switchControl).toHaveAttribute('aria-invalid', 'true')
  })

  it('should be required when required is true', async () => {
    render(<ComponentUnderTest required />)

    expect(screen.getByRole('checkbox')).toBeRequired()
  })
})

describe('Switch / Field', () => {
  it('should set checkbox as required', async () => {
    render(<SwitchWithField required />)
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(<SwitchWithField disabled />)
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeDisabled()
  })

  it('should display helper text', async () => {
    render(<SwitchWithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<SwitchWithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(<SwitchWithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('checkbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<SwitchWithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
