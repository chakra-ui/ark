import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('AngleSlider', () => {
  it.skip('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should display helper text', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('0deg')).toBeInTheDocument()
  })

  it('should set angle slider as disabled', async () => {
    render(<ComponentUnderTest disabled />)
    expect(screen.getByRole('slider')).toHaveAttribute('data-disabled', '')
  })

  it('should set angle slider as readonly', async () => {
    render(<ComponentUnderTest readOnly />)
    expect(screen.getByRole('slider')).toHaveAttribute('data-readonly', '')
  })
})
