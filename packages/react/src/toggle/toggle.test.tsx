import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Toggle, type ToggleProps } from './'

const ComponentUnderTest = (props: ToggleProps) => <Toggle {...props}>B</Toggle>

describe('Toggle', () => {
  it('should render', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('should handle click event', async () => {
    const onChange = vi.fn()
    render(<ComponentUnderTest onChange={onChange} />)
    const toggleButton = screen.getByText('B')
    await user.click(toggleButton)
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ pressed: true }))
  })

  it('should handle disabled state', () => {
    render(<ComponentUnderTest disabled />)
    const toggleButton = screen.getByText('B')
    expect(toggleButton).toBeDisabled()
  })

  it('should handle aria-label correctly', () => {
    render(<ComponentUnderTest aria-label="toggle-button" />)
    const toggleButton = screen.getByLabelText('toggle-button')
    expect(toggleButton).toBeInTheDocument()
  })

  it('should reflect initial pressed state', () => {
    render(<ComponentUnderTest pressed />)
    const toggleButton = screen.getByText('B')
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
  })
})
