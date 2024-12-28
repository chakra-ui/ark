import { cleanup, render, screen, waitFor } from '@testing-library/react/pure'
import { axe } from 'vitest-axe'
import { Carousel, carouselAnatomy } from '.'
import { getExports, getParts } from '../../setup-test'
import { Basic as ComponentUnderTest } from './examples/basic'

describe('Carousel / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  const renderedParts = getParts(carouselAnatomy).filter(
    (part) => !part.includes('[data-part="autoplay-trigger"]'),
  )

  it.each(renderedParts)('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(carouselAnatomy))('should export %s', async (part) => {
    expect(Carousel[part]).toBeDefined()
  })
})

describe('Carousel', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should have the correct disabled / enabled states for control buttons', async () => {
    render(<ComponentUnderTest />)
    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    const nextButton = screen.getByRole('button', { name: 'Next slide' })

    await waitFor(() => expect(prevButton).toBeDisabled())
    await waitFor(() => expect(nextButton).toBeEnabled())
  })
})
