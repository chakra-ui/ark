import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './examples/basic.vue'

describe('Carousel', () => {
  // happy-dom has no layout, so the carousel never measures a second page. Needs a real browser.
  it.skip('should have the correct disabled / enabled states for control buttons', async () => {
    render(ComponentUnderTest)
    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    const nextButton = screen.getByRole('button', { name: 'Next slide' })

    await waitFor(() => expect(prevButton).toBeDisabled())
    await waitFor(() => expect(nextButton).toBeEnabled())
  })
})
