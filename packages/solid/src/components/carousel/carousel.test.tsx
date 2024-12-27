import { render, screen, waitFor } from '@solidjs/testing-library'
import { Carousel, carouselAnatomy } from '../'
import { getExports, getParts } from '../../setup-test'
import { Basic as ComponentUnderTest } from './examples/basic'

describe('Carousel', () => {
  it.each(getParts(carouselAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(carouselAnatomy))('should export %s', async (part) => {
    expect(Carousel[part]).toBeDefined()
  })

  it('should have the correct disabled / enabled states for control buttons', async () => {
    render(() => <ComponentUnderTest />)
    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    const nextButton = screen.getByRole('button', { name: 'Next slide' })

    await waitFor(() => expect(prevButton).toBeDisabled())
    await waitFor(() => expect(nextButton).toBeEnabled())
  })
})
