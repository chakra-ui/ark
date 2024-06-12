import { carouselAnatomy } from '@ark-ui/anatomy'
import { cleanup, render, screen } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Carousel } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Carousel / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(carouselAnatomy))('should render part %s', async (part) => {
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
    const prevButton = screen.getByRole('button', { name: 'Previous Slide' })
    const nextButton = screen.getByRole('button', { name: 'Next Slide' })

    // first slide
    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeEnabled()

    // second slide
    await user.click(nextButton)
    expect(prevButton).toBeEnabled()
    expect(nextButton).toBeEnabled()

    // last slide
    await user.click(nextButton)
    expect(prevButton).toBeEnabled()
    expect(nextButton).toBeDisabled()
  })

  it('goes to the indicated slide on indicator click', async () => {
    render(<ComponentUnderTest />)
    const indicators = screen.getAllByTestId('indicator')
    const slides = screen.getAllByTestId('item')

    expect(slides[0]).toHaveAttribute('data-current', '')
    expect(indicators[0]).toHaveAttribute('data-current', '')

    await user.click(indicators[2])

    expect(indicators[0]).not.toHaveAttribute('data-current', '')
    expect(slides[0]).not.toHaveAttribute('data-current', '')
    expect(indicators[2]).toHaveAttribute('data-current', '')
    expect(slides[2]).toHaveAttribute('data-current', '')
  })
})
