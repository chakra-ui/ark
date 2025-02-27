import { render, screen, waitFor } from '@solidjs/testing-library'
import { Basic as ComponentUnderTest } from './examples/basic'

describe('Carousel', () => {
  it.skip('should have the correct disabled / enabled states for control buttons', async () => {
    render(() => <ComponentUnderTest />)
    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    const nextButton = screen.getByRole('button', { name: 'Next slide' })

    await waitFor(() => {
      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeEnabled()
    })
  })
})
