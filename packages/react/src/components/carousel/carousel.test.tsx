import { render, screen, waitFor } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Basic as ComponentUnderTest } from './examples/basic'

describe('Carousel', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should have the correct disabled / enabled states for control buttons', async () => {
    render(<ComponentUnderTest />)

    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    const nextButton = screen.getByRole('button', { name: 'Next slide' })

    await waitFor(() => {
      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeEnabled()
    })
  })
})
