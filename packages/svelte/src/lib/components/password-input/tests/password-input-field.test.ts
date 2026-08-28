import { render, screen } from '@testing-library/svelte'
import InvalidTest from './password-input-field-invalid.test.svelte'

describe('PasswordInput / Field', () => {
  it('should propagate invalid state from Field.Root', () => {
    render(InvalidTest)
    expect(screen.getByTestId('password-input')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByTestId('password-input')).toHaveAttribute('data-invalid')
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })
})
