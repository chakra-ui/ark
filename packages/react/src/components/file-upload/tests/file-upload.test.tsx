import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { WithField } from '../examples/with-field'
import { ComponentUnderTest } from './basic'

describe('File Upload', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('File Upload / Field', () => {
  it('should set file upload as required', async () => {
    render(<WithField required />)
    expect(screen.getByTestId('input')).toBeRequired()
  })

  it('should set file upload as disabled', async () => {
    render(<WithField disabled />)
    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should display helper text', async () => {
    render(<WithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<WithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on file upload when label is clicked', async () => {
    render(<WithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByTestId('input')).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<WithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
