import { render, screen, waitFor } from '@testing-library/vue'
import { Carousel, carouselAnatomy } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './examples/basic.vue'

describe('Carousel', () => {
  it.each(getParts(carouselAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(carouselAnatomy))('should export %s', async (part) => {
    expect(Carousel[part]).toBeDefined()
  })

  it('should have the correct disabled / enabled states for control buttons', async () => {
    render(ComponentUnderTest)
    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    const nextButton = screen.getByRole('button', { name: 'Next slide' })

    await waitFor(() => expect(prevButton).toBeDisabled())
    await waitFor(() => expect(nextButton).toBeEnabled())
  })
})
