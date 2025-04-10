import { act, render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Basic as ComponentUnderTest } from './examples/basic'

describe('Carousel', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should have the correct disabled / enabled states for control buttons', async () => {
    act(() => render(<ComponentUnderTest />))

    await screen.findByRole('button', { name: 'Next slide' })
    await screen.findByRole('button', { name: 'Previous slide' })
  })
})
